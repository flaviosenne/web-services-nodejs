import puppeteer from "puppeteer";
import axios from 'axios'
import { resolve } from 'path'
import { Extract } from 'unzipper'
import { createReadStream, readdirSync, unlinkSync, mkdirSync, existsSync } from 'fs'


let retry = 3

getXLSXEmbargoeds()

async function getXLSXEmbargoeds() {
    // diretorio de downloads do sistema operacional
    // const dir = process.env.USERPROFILE + "/Downloads"

    const dir = resolve('downloads-zip')
    if (!existsSync(dir)) {
        mkdirSync(dir)
    }
    const oldZips = getFilesZip(dir)

    console.log('zip quantity files old: ', oldZips.length)

    oldZips.forEach(file => {
        if (file) {
            console.log('file name zip :', file)
            deleteFile(`${dir}/${file}`)
        }
    })
    const key = ''
    const siteKey = ''
    const pageurl = ''

    const id = await getIdCaptcha(key, siteKey, pageurl)

    console.log('id: ', id)

    const captchaToken = await resolveCaptcha(key, id)

    console.log('captcha token ', captchaToken)

    const browser = await puppeteer.launch({ headless: false, product: 'chrome' });

    const page = await browser.newPage();
    const waitDownloadFinishedChorme = 'networkidle2'
    const waitDownloadFinishedFirefox = 'domcontentloaded'
    await page.goto(pageurl, { waitUntil: waitDownloadFinishedChorme });
    await page.setViewport({ width: 1080, height: 1024 });

    // setar diretorio de download com chrome
    const client = await page.target().createCDPSession()
    await client.send('Browser.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: resolve(dir)
    });

    console.log('aguardar navegação')
    let awaitNavigate = page.waitForNavigation()

    await sendResolveCaptcha(page, captchaToken)
    
    await awaitNavigate
    console.log('passou de página')
    
    verifyReprocess(page).then(async _ => {
        try {
            await sleep(10)
            await browser.close()
            console.log('deu bom ', dir)
            
            const zipPath = getFilesZip(dir)
            console.log('zip path = ', `${dir}/${zipPath[0]}`)
            if (zipPath.length == 1) {
                const extract = extractFileZip(`${dir}/${zipPath[0]}`, dir)
                
                await downloadFile(extract)
                
                const files = getFilesXls(dir)
                console.log(files)
                
                console.log('mas e esse aqui', dir + '/' + files[0])
            }
        } catch (error) {
            console.log('deu ruim ', error)
        }

    }).catch(async _ => {
        if (retry > 0) {
            await browser.close()
            getXLSXEmbargoeds()
        }
    })

}

async function sendResolveCaptcha(page, captchaToken) {
    await page.evaluate((token) => {
        const textarea = document.querySelector('textarea')
        const btn = document.getElementById('btnEntrar')
        textarea.style.display = ''
        textarea.innerHTML = token
        setTimeout(() => {
            btn.click()
        }, 4000)
    }, captchaToken)

}

function verifyReprocess(page) {
    return new Promise(async (resolve, reject) => {

        const nextPageSucess = await page.$('#gp04_legend')
        const errorSubmit = await page.$('blink')

        if (errorSubmit != null) {
            retry--
            console.log('retentar, pois o captcha entendeu que é um navegador de teste, ainda faltam ', retry, ' tentativas')
            reject({ message: 'retry' })
        }
        else if (nextPageSucess != null && errorSubmit == null) {
            console.log('passou a pagina')
            await page.evaluate(_ => {
                const xlsxBtn = document.getElementById('btn_exportarXLS')
                xlsxBtn.click()
            })
            resolve(null)
        } else {
            reject({ message: 'retry' })
        }
    })
}

function sleep(seg) {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            resolve()
        }, seg * 1000)
    })
}

async function getIdCaptcha(key, siteKey, pageurl) {
    const url = `http://2captcha.com/in.php?key=${key}&method=hcaptcha&sitekey=${siteKey}&pageurl=${pageurl}`
    let id
    const { data } = await axios({
        method: 'GET',
        url,
    })

    if (data && data.split('|').length > 1) {
        id = data.split('|')[1]
    }
    return id
}

async function resolveCaptcha(key, id) {

    return new Promise(async (resolve, reject) => {
        const url = `https://2captcha.com/res.php?key=${key}&action=get&id=${id}&json=1`
        let token
        while (true) {
            console.log('aguardando 15 segundos para resolver o captcha')
            await sleep(15)
            console.log('verificando se o captcha está pronto')
            const { data } = await axios({
                method: 'GET',
                url,
            })

            if (data.status == 1) {
                token = data.request
                return resolve(token)
            }
            if (data.request != 'CAPCHA_NOT_READY') {
                return reject()
            }
        }
    })
}

function extractFileZip(zip_path, dir) {
    return createReadStream(zip_path)
        .pipe(Extract({ path: dir }))
}

function getFilesXls(dir) {
    return readdirSync(dir)
        .filter(name => name.indexOf('.xls') !== -1 && name.indexOf('areas_embargadas') !== -1)
}

function getFilesZip(dir) {
    return readdirSync(dir)
        .filter(name => name.indexOf('.zip') !== -1 && name.indexOf('areas_embargadas') !== -1)
}


function downloadFile(input) {
    return new Promise((resolve, reject) => {
        input.on('close', async () => {
            resolve(null)
        })
    })
}


function deleteFile(path) {
    unlinkSync(path)
}