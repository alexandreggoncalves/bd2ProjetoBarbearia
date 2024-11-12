const express = require('express') // importando o modulo express
const router = express.Router()
//const { title } = require('process')

// consulta
router.get('/', (req, res) => { 
    res.render('dashboard/dashboard', { title: "Dashboard", page: "Dashboard"})
})

module.exports = router