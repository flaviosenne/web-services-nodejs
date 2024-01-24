const { MongoClient } = require("mongodb");
const { log } = require("../utils/logger");
const urlConnection =
  process.env.NODE_ENV.trim() == "test"
    ? "mongodb://localhost:27017/test_integration"
    : process.env.DATABASE_URL;


let connection = null;
let connected = false

const Database = {
  async getCollection(collectionName) {
    try {
      connection = await new MongoClient(urlConnection).connect();
      connected = true
      return connection.db().collection(collectionName);
    } catch (error) {
      log.error(error.message);
      this.closeConnection();
      throw new Error(error.message);
    }
  },

  async closeConnection() {
    if (connection) {
      await connection.close(true);
      connected = false
    }
  },

  async dropCollection(collectionName) {
    if (connection) {
      await connection.connect()
      await connection.db().dropCollection(collectionName)
      await this.closeConnection()
      log.warn('Apagou coleção '+collectionName)
    }
  },
};

module.exports = { Database };
