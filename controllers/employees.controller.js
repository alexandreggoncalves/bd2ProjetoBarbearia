const express = require('express') // importando o modulo express
const router = express.Router()
const Employees = require('../models/employees.model') // importação do model

// consulta
router.get('/', (req, res) => { 
    Employees.find().lean()
    .then(data => {
        res.render('employees/list', { title: "Cadastro de funcionários", page: "Listar funcionários cadastrados", employees: data})
    })
    .catch(err => 
        console.log('erro ao processar a operação: \n', err)
    )
})

router.get('/addOrEdit', (req, res) => {
    res.render('employees/addOrEdit', { title: "Cadastro de funcionários", page: "Inseir novo funcionário" })
})

// inserir
router.post('/addOrEdit', (req, res) => {
    const employees = {
        name: req.body.name,
        cpf: req.body.cpf, 
        emailAddress: req.body.emailAddress,
        genere: req.body.genere,
        birthday: req.body.birthday, 
        admissionDate: req.body.admissionDate,
        phoneNumber: req.body.phoneNumber, 
        function: req.body.function, 
        socialSecurity: req.body.socialSecurity, 
        address: { street: req.body.street, 
                        number: req.body.number, 
                        city: req.body.city, 
                        zipCode: req.body.zipCode, 
                        neighborhood: req.body.neighborhood, 
                        state: req.body.state, 
                        country: req.body.country, 
                }
    }

    //console.log(employees)
    const { _id} = req.body
    if(_id == '')
        new Employees({...employees}).save()
    .then(data => res.redirect('/employees'))
    .catch(err => console.log('erro durante a insersão de dados: \n', err))
    else
    Employees.findByIdAndUpdate(_id, employees)
    .then(data => res.redirect('/employees'))
    .catch(err => console.log('erro durante a atualização de dados: \n', err))
})

//editar
router.get('/addOrEdit/:id', (req, res) => {
    Employees.findById(req.params.id).lean()
    .then( data => res.render('employees/addOrEdit', { title: "Cadastro de funcionários", page: "Editar dados do funcionário", employees: data }))
    .catch(err =>
        console.log('Erro ao recuperar dados do id especificado', err))
})

//rota delete
router.get('/delete/:id', (req, res) => {
    Employees.findByIdAndDelete(req.params.id)
    .then(data => res.redirect('/employees'))
    .catch(err => console.log('erro ao remover o registro:\n', err))
}) 

module.exports = router