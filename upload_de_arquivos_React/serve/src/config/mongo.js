const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://joao:joao@cluster0-ziosp.mongodb.net/clinica?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
)
mongoose.connection.on('connected', () => 
      console.log(`Mongoose! conectado `)
   )

   mongoose.connection.on('disconnected', () => 
      console.log(`Mongoose! desconectado`)
   )

   mongoose.connection.on('error', erro => 
      console.log(`Mongoose! ERRO na conexão `)
   )

   // Capturamos um sinal de encerramento (SIGINT), Ctrl+C
   process.on('SIGINT', () => 
      mongoose.connection.close(() => {
         console.log('* Mongoose! Desconectado pelo término da aplicação');
         // 0 indica que a finalização ocorreu sem erros 
         process.exit(0);
      })
   )
   module.exports = mongoose