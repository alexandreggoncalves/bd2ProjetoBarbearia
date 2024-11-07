const mongoose = require('mongoose') // importação do módulo mongoose

const dbUri = 'mongodb://localhost:27017/barbershop_db' // definição da string de conexão

module.exports = () => mongoose.connect(dbUri) // conexão com o banco de dados