const Connection = require('elasticsearch')

const getConnection = () => {
    return Connection.Client({
        host: 'localhost:9200',
        log: 'trace'
    })
}

module.exports = getConnection
