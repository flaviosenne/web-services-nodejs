import express from 'express'

const routes = express.Router()

import User from './controllers/User'

routes.post('/send', User.store)


export default routes