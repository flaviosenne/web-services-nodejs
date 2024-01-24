const express = require('express')
const { log } = require('./logger')
const port = 3003
const app = express()

app.use('/', (req, res)=> {
    try{
        const {name} = req.body
        if(!name){
            log.warn('houve um erro na rota inicial'+ err.message)
            res.send('é necessário enviar o nome na rota')
        }
        log.info('Rota inicial')
        res.send('olá mundo')
    }catch(err){
        log.error('houve um erro na rota inicial'+ err.message)
    }
})

app.listen(port, ()=> log.info('servidor rodando na porta'+port))