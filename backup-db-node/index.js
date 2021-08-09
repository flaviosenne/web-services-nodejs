const spawn = require('child_process').spawn
const fs = require('fs')

const fileDest = fs.createWriteStream('teste.sql')

const mysqlDump = spawn('mysqldump', [
    '-u',
    'user_db',
    '-p',
    'senha_db',
    'name_db'
])

mysqlDump
.stdout
.pipe(fileDest)
.on('finish',()=> console.log('completed dump'))
.on('error', err => console.log(err))
