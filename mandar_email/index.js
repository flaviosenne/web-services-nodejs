
const path =require('path')
const fs =require('fs')

const nodemailer = require('nodemailer')
const smtp = require('./config/smtp')

const transporter = nodemailer.createTransport(smtp)

const hsb = require('nodemailer-express-handlebars')

console.log(path.join(__dirname, '/views'))

transporter.use('compile', hsb({
    viewEngine: 'express-handlebars',
    viewPath: './views/',
    extName: '.handlebars'
}))

transporter.sendMail({
    from: 'joao dev <joaodev3@gmail.com>',
    to: "flaviosenne123@gmail.com",
    subject: "Isso é um teste",

    attachments: [
        {
            filename: 'emoji.jpg',
            path: `${path.resolve(__dirname)}/emoji.jpg`,
            cid: 'emoji'
        }
    ],
    template: 'main',
    context: {
        name: 'main'
    }
}).then(msg => {
    console.log('deu certo',msg)
}).catch(err => {
    console.log('deu ruim', err)
})
