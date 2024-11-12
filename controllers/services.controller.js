const express = require('express') // importando o modulo express
const router = express.Router()
const usersLogedRoutes = require('../controllers/users.loged.controller')
const Services = require('../models/services.model') // importação do model
//const { title } = require('process')

// consulta
router.get('/', usersLogedRoutes, (req, res) => { 
    Services.find().lean()
    .then(data => {
        res.render('services/list', { title: "Cadastro de serviços", page: "Listar serviços cadastrados", services: data})
    })
    .catch(err => 
        console.log('erro ao processar a operação: \n', err)
    )
})

router.get('/addOrEdit', (req, res) => {
    res.render('services/addOrEdit', { title: "Cadastro de serviços", page: "Inseir novo serviço" })
})

// inserir
router.post('/addOrEdit', (req, res) => {
    var active = '';
    if ( req.body.active ) {
        active = req.body.active
    }

    const services = {
        name: req.body.name,
        time: req.body.time,
        price: req.body.price, 
        description: req.body.description, 
        active: active, 
    }

    //console.log(services)
    const { _id} = req.body
    if(_id == '')
        new Services({...services}).save()
    .then(data => res.redirect('/services'))
    .catch(err => console.log('erro durante a insersão de dados: \n', err))
    else
    Services.findByIdAndUpdate(_id, services)
    .then(data => res.redirect('/services'))
    .catch(err => console.log('erro durante a atualização de dados: \n', err))
})

//editar
router.get('/addOrEdit/:id', (req, res) => {
    Services.findById(req.params.id).lean()
    .then( data => res.render('services/addOrEdit', { title: "Cadastro de serviços", page: "Editar dados do serviço", services: data }))
    .catch(err =>
        console.log('Erro ao recuperar dados do id especificado', err))
})

//rota delete
router.get('/delete/:id', (req, res) => {
    Services.findByIdAndDelete(req.params.id)
    .then(data => res.redirect('/services'))
    .catch(err => console.log('erro ao remover o registro:\n', err))
}) 

module.exports = router