import os from 'os'
import cluster from 'cluster'

const runPrimaryProcess = () =>{
    const processesCount = os.cpus().length * 2
    console.log(`Processo primario ${process.pid} está executando`)
    console.log(`Copias de servidores com  ${processesCount} processos \n`)

    for(let i = 0; i < processesCount; i++){
        cluster.fork()
    }

}

const runWorkerProcess = async () =>{
    await import('./server.js')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()