import  { Router } from 'express'

const routes = Router()

routes.get('/msg', (req, res) => {
    return res
    .status(200)
    .json({msg: 'teste de msg'})
})

routes.post('/msg', (req, res) => {
    const { msg }= req.body

    if(!msg) return res.status(400).json(null)
    
    return res
    .status(201)
    .json({msg})
})

export { routes}