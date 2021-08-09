const axios = require('axios')
const getConnection = require('../config/elasticsearch')
module.exports = class Elastic {

    async saveQuestions(req, res) {
        axios.get('http://localhost:3000/questions/list',{
            headers: {
              'Content-Type': 'application/json',
            }}
          )
        .then(async result => {
            const { data } = result
            const client = getConnection()

            for await(let row of data){
              await client.index({
                index: 'embrapa',
                type: 'soja',
                id: row.id,
                body: row  
              }, (err, resp) => {
                if(err) {
                  return res.status(400).json(err)
                }else{
                  return res.json({msg: 'index ok', resp})
                }
              })
            }
            
        }) 
    }

    async listQuestions(req, res) {
      const client = getConnection()

    const resultElastic = await client.search({
      index: 'soja_question_response',
      size: 1000,
      body: {
        query: {
          match: { name: 'soja'}
        }
      }
    })
    return res.json(resultElastic)    
  }
}
