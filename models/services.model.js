const mongoose = require('mongoose') // importação do modulo mongoose

module.exports = mongoose.model('services', {
    name: String,
    time: Number, 
    price: Number,
    description: String,
    active: String,
})