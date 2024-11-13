const express = require('express') // importando o modulo express
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../models/users.model') // importação do model

router.post('/login', async (req, res) => {
    const { userEmail, userPassword } = req.body
    
    // verificar se usuário existe
    const user = await Users.findOne({userEmail: userEmail})
    //console.log(user)
    if(!user) {
        res.cookie('msgClass', 'danger')
        res.cookie('message', 'Erro! Usuário não encontrado.')
        res.redirect('/login')
    } else {
        // verificar a senha se é válida
        const checkPassword = await bcrypt.compare( userPassword, user.userPassword )

        if(!checkPassword) {
            res.cookie('msgClass', 'danger')
            res.cookie('message', 'Erro! Senha inválida.')
            res.redirect('/login')
        } else {
            if( user.userActive == 'on' ) {
                const userID = user._id

                try{
                    const secret = process.env.SECRET
                    const token = jwt.sign({ userID }, secret, { expiresIn: 86400}) // token para expirar em 24h
        
                    res.cookie('auth', true)
                    res.cookie('token', token)
                    res.cookie('firstName', user.firstName)
                    res.redirect('/dashboard')
                } catch(error) {
                    res.cookie('msgClass', 'warning')
                    res.cookie('message', 'Opss! Não foi possivel conectar, tente mais tarde.')
                    res.redirect('/login')
                }
            } else {
                res.cookie('msgClass', 'warning')
                res.cookie('message', 'Opss! Seu usuário foi desativado, contate o administrador.')
                res.redirect('/login')
            }
        }
    }
})

module.exports = router