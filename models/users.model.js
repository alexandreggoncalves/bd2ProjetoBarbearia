const mongoose = require('mongoose') // importação do modulo mongoose

module.exports = mongoose.model('users', {
    firstName: String,
    lastName: String, 
    userEmail: String, 
    userPassword: String,
    userActive: String, 
})