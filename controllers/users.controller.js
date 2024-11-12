const express = require('express') // importando o modulo express
const router = express.Router()
const usersLogedRoutes = require('../controllers/users.loged.controller')
const Users = require('../models/users.model') // importação do model
const bcrypt = require('bcrypt')

// consulta
router.get('/', usersLogedRoutes, (req, res) => { 
    const firstName = req.cookies.firstName
    Users.find().lean()
    .then(data => {
        res.render('users/list', { firstName: firstName, title: "Cadastro de usuários", page: "Listar usuários cadastrados", users: data})
    })
    .catch(err => 
        console.log('erro ao processar a operação: \n', err)
    )
})

router.get('/addOrEdit', usersLogedRoutes, (req, res) => {
    const firstName = req.cookies.firstName
    res.render('users/addOrEdit', { firstName: firstName, title: "Cadastro de usuários", page: "Inseir novo usuário" })
})

// inserir
router.post('/addOrEdit', usersLogedRoutes, async (req, res) => {
    var active = '';
    if ( req.body.userActive ) {
        active = req.body.userActive
    }

    const { _id} = req.body
    if(_id == '') {
        const saltRounds = 10;
        const userPassword =  await bcrypt.hashSync( req.body.userPassword, saltRounds);
        const usersNew = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userEmail: req.body.userEmail, 
            userPassword: userPassword, 
            userActive: active, 
        }
        new Users({...usersNew}).save()
    .then(data => res.redirect('/users'))
    .catch(err => console.log('erro durante a insersão de dados: \n', err))
    } else {
        const usersEdit = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userEmail: req.body.userEmail, 
            userActive: active, 
        }
        Users.findByIdAndUpdate(_id, usersEdit)
        .then(data => res.redirect('/users'))
        .catch(err => console.log('erro durante a atualização de dados: \n', err))
    }
})

//editar
router.get('/addOrEdit/:id', usersLogedRoutes, (req, res) => {
    const firstName = req.cookies.firstName
    Users.findById(req.params.id).lean()
    .then( data => res.render('users/addOrEdit', { firstName: firstName, title: "Cadastro de usuários", page: "Editar dados do usuário", users: data }))
    .catch(err =>
        console.log('Erro ao recuperar dados do id especificado', err))
})

//rota delete
router.get('/delete/:id', usersLogedRoutes, (req, res) => {
    Users.findByIdAndDelete(req.params.id)
    .then(data => res.redirect('/users'))
    .catch(err => console.log('erro ao remover o registro:\n', err))
}) 

module.exports = router