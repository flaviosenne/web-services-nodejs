import express from 'express'
import pdf from 'html-pdf'
import ejs from 'ejs'

import path from 'path'
import fs from 'fs'

const app = express()

ejs.renderFile('./index.ejs', {nome: 'joao', idade:21, curso: 'ADS'}, (err, html)=> {
    if(err){
        console.log(err)
        return 'nada'
    }else{

        pdf.create(html, {}).toFile('./pdf/pdfTest.pdf', (err, res) => {
            if(err){
                console.log(err)
            }
            else{
                console.log(res)
            }
        })
    }
})

app.listen(3000, console.log('server running'))
