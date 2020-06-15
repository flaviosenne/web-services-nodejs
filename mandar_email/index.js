const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    security: true,
    auth: {
        
    }
});

transporter.sendMail({
    from: 'joao flavio <flaviosenne123@gmail.com>',
    to: 'joaoflausino123@hotmail.com',
    subject: 'Oi sou eu mesmo e estou fazendo uns teste',
    text: 'Tudo bem comigo mesmo, estou testando a biblioteca nodemailer e é muito interessante.',
    html: 'Olá meu nome é <strong>JOÂO</strong> e <a href = "https:/www.google.com.br"> nodemailer </a> é demais'

}).then(message => {
    console.log(message);
}).catch(err =>{
    console.log(err);
})