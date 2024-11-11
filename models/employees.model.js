const mongoose = require('mongoose') // importação do modulo mongoose

module.exports = mongoose.model('employees', {
    name: String,
    cpf: String, 
    emailAddress: String,
    birthday: String, 
    genere: String, 
    admissionDate: String,
    phoneNumber: String, 
    function: String, 
    socialSecurity: Number,
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