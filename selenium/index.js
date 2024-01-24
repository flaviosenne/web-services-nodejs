const { By, Builder, Browser } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome.js");

const pageUrl = process.env.URL

async function certificateApprovePaymentCrawler({ user }) {
    let driver = null;
    let protocols = []
    try {
        const chormeOptions = new Options();
        chormeOptions.addArguments("--headless=true", "--log-level=1");

        driver = new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(chormeOptions)
            .build();

        await driver.get(pageUrl);

        await driver.executeScript('window.localStorage.clear()')

        await login(driver, user);

        await filterStatusPendingPayment(driver)

        await approvePaymentFirstRow(driver, protocols)

        return { error: false, protocols }


    } catch (error) {
        log.error(error);
        return { error: true, protocols }
    } finally {
        await sleep(3);

        driver.quit();
    }
}

async function login(driver, user) {
    // permitir os coockies
    await sleep(3)
    //  const coockie = await driver.executeScript("return document.querySelectorAll('a.cc-btn')")
    await driver.executeScript("document.querySelectorAll('a.cc-btn')[0].click()")
    await sleep(2)
    await driver.findElement(By.id("usuario")).sendKeys(user.username);
    await driver.findElement(By.id("senha")).sendKeys(user.pass);
    await driver.findElement(By.id("prosseguir")).click();
}

async function filterStatusPendingPayment(driver) {
    //setar um select na terceira pocição
    await driver.executeScript("document.querySelector('#status > option:nth-child(3)').selected = true")
    await driver.executeScript("document.getElementById('filtrar').click()")
}

async function approvePaymentFirstRow(driver, protocols) {
    try {
        // buscar ultima página
        await driver.executeScript("document.getElementById('lbtnLastPage').click()")
        const tr = await driver.findElements(By.css('tr'))
        if (tr.length > 1) {
            const row = await driver.findElements(By.css("tr"));
            const col = await row[1].findElements(By.css("td"));
            const protocol = await col[1].getText()

            protocols.push(protocol)

            // pega a primeira linha após o cabeçalho e a primeira coluna 
            // e clica na tag a onde redireciona para outra pagina
            await driver.executeScript("document.querySelector('tr:nth-child(2) > td:nth-child(1) > a').click()")

            // adicionar na lista o protocolo referente ao pagamento aprovado
            // após clicar na opção de gerar pagamento, será redirecionado para uma segunda tela com a mesma estrutura
            // então será clicado no botão da flecha a direita estando na segunda linha e na primeira coluna da tabela
            await driver.executeScript("document.getElementById('btnGerarPagamento').click()")

            // é necessário mudar o contexto para dentro do frame para buscar o elemento
            await driver.switchTo().frame('framePage');

            // após mudar para o iframe, será clicado no botão de confirmar pagamento
            await driver.executeScript("document.getElementById('Confirmacao_btnConcluirPedido').click()")

            // será clicado na opção de voltar a tela principal
            await driver.executeScript("document.querySelectorAll('a')[1].click()")

            // depois de clicar na confirmação do pagamento e clicar em voltar a tela principal,
            // deve voltar as configurações padrão
            await driver.switchTo().defaultContent();
            return true
        } else {
            return false
        }
    } catch (err) {
        log.error(err.message)
        return false
    }
}


function sleep(seg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, seg * 1000);
    });
}

module.exports = { certificateApprovePaymentCrawler };
