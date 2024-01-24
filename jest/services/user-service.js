const { UserModel } = require("../model/user-keys")

const UserKeyService = {
    async create({ tenant, webhook }) {
        return UserModel.create({ tenant, webhook })
    },
    async findByKey(key) {
        return UserModel.findByKey(key)
    }
}

module.exports = { UserKeyService }