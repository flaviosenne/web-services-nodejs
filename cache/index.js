const express = require('express')

const app = express()

app.use(express.json())

const redis = require('redis')
const redisClient = redis.createClient()

const getCache = (key) => {
    return new Promise((resolve, reject) => {

        redisClient.get(key, (err, value) => {
            if (err) {
                reject(err)
            } else {
                resolve(value)
            }
        })

    })

}

const setCache = (key, value)=>{
    return new Promise((resolve, reject) => {
        redisClient.set(key, value, 'EX', '10', (err) => {
            if(err){
                reject(err)
            }else{
                resolve(true)
            }
        })
    })
}

const cache = {

}

const dbFind = (id) => {
    const time = parseInt(Math.random() * 2000)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve('id: ' + id + ' time: ' + time), time
        })
    })
}
app.get('/', (req, res) => {
    res.send('oi')
}
)

app.get('/get/:id', async (req, res) => {
    const id = (req.params.id)

    const value = await getCache('get'+id)

    if(value) res.send('return from Cache=' + value)

    else{
        const idValue = await dbFind(id)
        await setCache('get'+id, idValue)

        res.send('return from BD=' + idValue)
    }
    // const now = new Date().getTime()
    // if (cache[id] && cache[id].time + 10000 > now) {
    //     res.send(now - cache[id].time + 'retun from cache=' + JSON.stringify(cache[id]))
    // } else {
    //     const idValue = await dbFind(id)
    //     cache[id] = {
    //         time: (new Date().getTime()),
    //         value: idValue
    //     }
    //     return res.send('return from BD=' + idValue)
    // }

}
)


app.listen(3000, console.log('running...'))