const express = require('express') // importando o modulo express
const jwt = require('jsonwebtoken')

async function usersLoged(req, res, next) {
    // pega os cookies do navegador
    //const authHeader = req.headers.cookie.Token
    //console.log(req.cookies)

    // verifica se o cookie exite 
    if( req.cookies.auth && req.cookies.auth === 'true' ) {
        try {
            const token = req.cookies.token
            // se conseguir autoriza o acesso
            const secret = process.env.secret
            jwt.verify(token, secret)
            next()
        } catch {
            // se não conseguir, bloqueia o acesso
            res.render('users/login', { title: "Login", page: "Login", login: true, msgClass: 'danger', message: 'Acesso não autorizado.'})
        }
    } else {
        res.render('users/login', { title: "Login", page: "Login", login: true, msgClass: 'danger', message: ''})
    }
}

module.exports = usersLoged