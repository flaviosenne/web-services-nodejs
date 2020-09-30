// const express = require('express')
// const smtp = require('./config/smtp')

// const nodemailer = require('nodemailer')
// const port = 3000

// const app = express()


//     const tranporter = nodemailer.createTransport({
//         host: smtp.host,
//         port: smtp.port,
//         secure: false,
//         auth: {
//             user: smtp.user,
//             pass: smtp.pass
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     })


// async function send(){
//     const mailer = await tranporter.sendMail({
//         text: 'Esse texto é um texto',
//         subject: 'Estou passando aqui para contar um assunto',
//         from: `Joao Dev <${smtp.user}>`,
//         to:['flaviosenne123@gmail.com']
//     })

//     console.log(mailer)
// }

// send()

// app.listen(port, console.log('server running: ', port))
const nodemailer = require('nodemailer')
const smtp = require('./config/smtp')

let transporter = nodemailer.createTransport(smtp)

transporter.sendMail({
    from: 'joao dev <joaodev3@gmail.com>',
    to: "flaviosenne123@gmail.com",
    subject: "Isso é um teste",
    text: 'Olá, estou testando o envio de email',
    html: "Olá estou vindo pelo HTML para <strong>testar</strong> os estilos "
}).then(msg => {
    console.log('deu certo',msg)
}).catch(err => {
    console.log('deu ruim', err)
})
