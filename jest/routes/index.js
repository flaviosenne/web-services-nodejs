const { Router } = require("express")

const { UserController } = require("../controller/user-controller")

const routes = Router()

routes.post("/v1/user-keys", UserController.create)

module.exports = { routes }
