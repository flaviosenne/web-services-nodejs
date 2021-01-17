import Mail from '../lib/Mail'

export default {
    key:'RegistrationMail',
   async handle( {data}){
       const {user: {name, email}} = data
        await Mail.sendMail({
            from: 'Queue teste <queue@teste.com.br>',
            to: `${name} <${email}>`,
            subject: 'Cadastro de Usuários',
            html: 'Olá, bem vindo ao envio de <strong>email</strong> com nodemailer em background'
        })
    }
}