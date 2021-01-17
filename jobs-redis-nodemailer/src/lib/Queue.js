import Queue from 'bull'
import RedisConfig from '../config/redis'


import * as jobs from '../jobs'

const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, RedisConfig),
    name: job.key,
    handle: job.handle
}))

export default {
    queues,
    add(name, data) {
        const queue = this.queues.find(queue => queue.name == name)

        return queue.bull.add(data)
    },
    process() {
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle)

            queue.bull.on('failed', (job, err) => {
                console.log('job failed', queue.key, job.data)
                console.log(err)
            })
        })
    }
}
// import RegistrationMail from '../jobs/RegistrationMail'

// const mailQueue = new Queue(RegistrationMail.key, RedisConfig)

//

// export default mailQueue