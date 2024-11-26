const { timeStamp } = require('console')
const { generateKeySync, KeyObject } = require('crypto')
const mongoose = require('mongoose') // importação do modulo mongoose
const { isKeyObject } = require('util/types')

module.exports = mongoose.model('schendules', {
    clients_id: mongoose.Types.ObjectId,
    services_id: mongoose.Types.ObjectId, 
    employees_id: mongoose.Types.ObjectId,
    startDate: Date, 
    finishDate: Date, 
    observation: String,
})