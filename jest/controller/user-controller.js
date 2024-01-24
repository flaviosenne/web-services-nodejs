const { UserService } = require("../services/user-service");

const UserController = {
  async create(req, res) {
    try{
      const { tenant, webhook } = req.body
      if (!tenant) return res.status(400).send({message: `Missing tenant in request body`})
      if (!webhook) return res.status(400).send({message: `Missing webhook in request body`})
      const result = await UserService.create({ tenant, webhook })
      return res.status(201).send(result)
      
    }catch(err){
      log.error(`Erro em criar chave para o tenant ${tenant} : ${err.message}`)
      return res.status(500).send({message: err.message})
    }
  },

};

module.exports = { UserController };
