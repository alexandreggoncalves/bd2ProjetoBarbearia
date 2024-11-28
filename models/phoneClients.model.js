const { timeStamp } = require('console')
const { generateKeySync, KeyObject } = require('crypto')
const mongoose = require('mongoose') // importação do modulo mongoose
const { isKeyObject } = require('util/types')

module.exports = mongoose.model('phoneClients', {
    client_id: mongoose.Types.ObjectId,
    ddd: Number, 
    phone: String, 
    type: String, 
    whatsapp: String,
})