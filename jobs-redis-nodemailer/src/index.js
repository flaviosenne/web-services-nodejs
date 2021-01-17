import 'dotenv/config'
import express from 'express'
import routes from './routes'

import BullBoard from 'bull-board'
import Queue from './lib/Queue'

const app = express()
// BullBoard.setQueues(Queue.queues.map(queue => queue.bull))
// BullBoard.setQueues(Queue.queues.map(queue => queue.bull))

app.use(express.json())

// app.use('/', BullBoard.UI)

app.use(routes)

app.listen(3000, () => console.log('server running in port 3000'))