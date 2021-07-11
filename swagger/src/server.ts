import express from 'express'
import swagger from 'swagger-ui-express'

import { routes } from './routes'
import swaggerDocs from './swagger.json'

const app = express()
app.use(express.json())

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocs))

app.use(routes)

app.listen(4000, ()=> console.log('server runing...'))