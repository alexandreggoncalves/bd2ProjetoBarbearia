const express = require('express') // importando o modulo express

async function usersLogoutRoutes(req, res, next) {
    res.clearCookie('auth')

    res.redirect('/dashboard')
}

module.exports = usersLogoutRoutes