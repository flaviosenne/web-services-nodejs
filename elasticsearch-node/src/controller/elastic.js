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
                type: 'type_embrapa',
                body: row  
              }, (err) => {
                if(err) return res.status(400).json(err)
              })
            }
            
            return res.json({msg: 'index ok'})
        }) 
    }

    async listQuestions(req, res) {
      const client = getConnection()

    const resultElastic = await client.search({
      index: 'embrapa',
      size: 1000
    })
    return res.json(resultElastic)    
  }
}
