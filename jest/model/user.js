const { v4: uuid } = require("uuid");
const { Database } = require('../config/db-connection');
const { log } = require("../utils/logger");

const UserModel = {
  async create({ tenant, webhook }) {
    try {
      const entity = await Database.getCollection("user_keys");
      const { insertedId } = await entity.insertOne({
        createdAt: new Date().toISOString(),
        key: uuid(),
        tenant,
        webhook
      });

      return await entity.findOne({ _id: insertedId })
    } catch (err) {
      log.error(err.message)
      throw new Error(err.message)
    } finally {
      await Database.closeConnection()
    }
  },

  async findByKey(key) {
    try {
      const entity = await Database.getCollection("user_keys")

      return await entity.findOne({ key })
    } catch (err) {
      log.error(err.message)
      throw new Error(err.message)
    } finally {
      await Database.closeConnection()
    }
  },
};

module.exports = { UserModel }