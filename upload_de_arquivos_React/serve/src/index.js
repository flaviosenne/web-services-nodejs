require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const path = require('path')

const connection = require('./config/mongo')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
// liberar acesso para a rota files
// por exemplo
// http://localhost:3000/files/nome-do-arquivo
// o arquivo será acessível
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp','uploads')))

app.use(require('./routes'))

app.listen(3000, console.log('server running'))