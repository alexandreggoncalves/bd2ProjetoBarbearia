const mongoose = require('mongoose') // importação do modulo mongoose

module.exports = mongoose.model('clients', {
    name: String,
    cpf: String, 
    emailAddress: String,
    birthday: String, 
    genere: String, 
    admissionYear: Number,
    phoneNumber: String, 
})