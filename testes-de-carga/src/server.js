import  http from'http'

// lib autocannon vai fazer o teste de carga, dentro do script teste usa a essa lib
// o parametro -c é quantos usuário simultaneos
// o parametro -d é a duração
// o parametro --workers é quantas threads vão ser abertas para trabalhar simultaneo
// o parametro --renderStatusCodes é para mostrar quantas requisições denram certo ou não
// o parametro --latency é para mostrar quanto de latencia (demora) está sendo cada requisição
// o parametro --warmup serve para fazer algumas requisições antes de começar o teste de carga
// o parametro [-c 1 -d 2] perto do warmup serve para dizer quantos usuários concorrentes e a duração por segundos
    
const processId = process.pid
const server = http.createServer((req, res) => {
  
    for(let i = 0; i < 1e7; i++){
    }
    if(processId < 10000){
        throw new Error('deu erro')
    }
    
    return res.end('handle pid '+processId)
   
})

server.listen(3000)
.on('listening', ()=> {
    console.log('Servidor iniciado no processo ', processId)
})


process.on('exit', ()=> {
    console.log(`processo com PID ${processId} foi finalizado` )
    server.close()
})
 