require('dotenv').config()
const { app } = require('./config/server');
const { log } = require('./utils/logger');

const PORT = 3001

app.listen(PORT, () => {
  log.info("Servidor rodando na porta "+ PORT)
});
