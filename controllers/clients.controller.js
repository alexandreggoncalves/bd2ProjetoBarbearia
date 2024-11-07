const express = require('express') // importando o modulo express
const router = express.Router()
const Clients = require('../models/clients.model') // importação do model
//const { title } = require('process')

// consulta
router.get('/', (req, res) => { 
    Clients.find().lean()
    .then(data => {
        res.render('clients/list', { title: "Cadastro de clientes", page: "Listar clientes cadastrados", clients: data})
    })
    .catch(err => 
        console.log('erro ao processar a operação: \n', err)
    )
})

router.get('/addOrEdit', (req, res) => {
    res.render('clients/addOrEdit')
})

// inserir
router.post('/addOrEdit', (req, res) => {
    const clients = {
        name: req.body.name,
        cpf: req.body.cpf, 
        emailAddress: req.body.emailAddress,
        birthday: req.body.birthday, 
        genere: req.body.genere,
        admissionYear: req.body.admissionYear,
        phoneNumber: req.body.phoneNumber, 
    }
    const { _id} = req.body
    if(_id == '')
        new Client({...clients}).save()
    .then(data => res.redirect('/clients'))
    .catch(err => console.log('erro durante a insersão de dados: \n', err))
    else
    Clients.findByIdAndUpdate(_id, clients)
    .then(data => res.redirect('/clients'))
    .catch(err => console.log('erro durante a atualização de dados: \n', err))
})

//editar
router.get('/addOrEdit/:id', (req, res) => {
    Clients.findById(req.params.id).lean()
    .then( data => res.render('clients/addOrEdit', { clients: data }))
    .catch(err =>
        console.log('Erro ao recuperar dados do id especificado', err))
})

//rota delete
router.get('/delete/:id', (req, res) => {
    Clients.findByIdAndDelete(req.params.id)
    .then(data => res.redirect('/clients'))
    .catch(err => console.log('erro ao remover o registro:\n', err))
}) 

module.exports = router