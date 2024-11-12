const express = require('express') // importando o modulo express
const usersLogedRoutes = require('../controllers/users.loged.controller')
const router = express.Router()
//const { title } = require('process')

// consulta
router.get('/', usersLogedRoutes, (req, res) => { 
    const firstName = req.cookies.firstName
    res.render('dashboard/dashboard', { firstName: firstName, title: "Dashboard", page: "Dashboard"})
})

module.exports = router