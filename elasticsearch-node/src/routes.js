const { Router} = require('express')
const Elastic = require( './controller/elastic')

const routes = Router()
const elastic = new Elastic()

routes.post('/questions', elastic.saveQuestions)
routes.get('/questions', elastic.listQuestions)

module.exports = routes 