import Queue from '../lib/Queue'

export default {

    index(req, res) {

        res.send('oi')

    },
    async store(req, res) {

        const { name, email, pass } = req.body

        const user ={
            name,
            email, 
            pass
        }
        
       //Adicionar job registration na fila
        await Queue.add('RegistrationMail', {user})
        await Queue.add('UserReport', {user})
        
        return res.json(user)

    }
}