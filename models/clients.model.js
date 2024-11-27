const mongoose = require('mongoose') // importação do modulo mongoose

module.exports = mongoose.model('clients', {
    name: String,
    cpf: String, 
    emailAddress: String,
    birthday: String, 
    genere: String, 
    clientSince: String,
    address: {
       street: String,
       number: String, 
       city: String, 
       zipCode: String, 
       state: String,
       country: String,
       neighborhood: String,
    }
})