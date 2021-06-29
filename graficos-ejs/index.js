const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.get('/chart',(req, res)=>{

    const obj = {
        month: ['jan','fev','mar', 'abr'],
        value: [100, 150, 170, 145]
    }

    res.render('index', { obj})
})

app.listen(80, ()=> console.info('server'))

