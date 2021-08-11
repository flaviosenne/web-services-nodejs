const axios = require('axios')
const getConnection = require('../config/elasticsearch')

module.exports = class Elastic {

  async saveQuestions(req, res) {
    axios.get('http://localhost:3000/questions/list', {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    )
      .then(async result => {
        const { data } = result
        const client = getConnection()

        for await (let row of data) {
          await client.index({
            index: 'embrapa',
            body: row
          }, (err, resp) => {
            if (err) {
              return res.status(400).json(err)
            } else {
              return res.json({ msg: 'index ok', resp })
            }
          })
        }

      })
  }

  async listQuestions(req, res) {
    const client = getConnection()

    const { param } = req.body

    const resultElastic = await client.search({
      index: 'embrapa',
      from: 0,
      size: 10,
      body: {
        query: {
          bool: {
            should: [
              { match: { question: param } },
              { match: { response: param } },
              { match: { category: { query: param, boost: 2.0 } } }
            ]
          }
        }
      }
    })
    return res.json(resultElastic)
  }
}
