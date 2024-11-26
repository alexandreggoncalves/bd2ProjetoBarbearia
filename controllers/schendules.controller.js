const express = require('express') // importando o modulo express
const router = express.Router()
const usersLogedRoutes = require('../controllers/users.loged.controller')
const Schendules = require('../models/schendules.model') // importação do model
const Clients = require('../models/clients.model')
const Employees = require('../models/employees.model')
const Services = require('../models/services.model')

//const { title } = require('process')

// consulta
router.get('/', usersLogedRoutes, (req, res) => { 
    const firstName = req.cookies.firstName
    Schendules.aggregate( [
                            { $lookup:{ from:"clients", 
                                        localField:"clients_id", 
                                        foreignField:"_id", 
                                        as: "client"}
                            },
                            { $lookup:{ from:"services", 
                                localField:"services_id", 
                                foreignField:"_id", 
                                as: "service"}
                            }, 
                            { $lookup:{ from:"employees", 
                                localField:"employees_id", 
                                foreignField:"_id", 
                                as: "employe"}
                            }
                        ])
    .then(dataSchendule => {
        //console.log(dataSchendule)
        res.render('schendules/list', { firstName: firstName, title: "Cadastro de agendamentos", page: "Listar agendamentos cadastrados", schendules: dataSchendule})
    })
    .catch(err => 
        console.log('erro ao processar a operação: \n', err)
    )
})

router.get('/addOrEdit', usersLogedRoutes, (req, res) => {
    const firstName = req.cookies.firstName
    Clients.find().lean()
    .then(dataClients => {
        Services.find().lean()
        .then(dataServices => {
            Employees.find().lean()
            .then(dataEmployees => {
                res.render('schendules/addOrEdit', { firstName: firstName, title: "Cadastro de agendamentos", page: "Inseir novo agendamento", dataClients: dataClients, dataServices: dataServices, dataEmployees: dataEmployees })
            })
        })
    })
})

// inserir
router.post('/addOrEdit', usersLogedRoutes, (req, res) => {
    
    // transforma uma data em timestamp
    const dateToTime = req.body.schenduleDate.substring(6,10)+'-'+req.body.schenduleDate.substring(3,5)+'-'+req.body.schenduleDate.substring(0,2)+' '+req.body.schenduleTime+':00'
    const time = new Date(dateToTime)
    const timeSTMP = time.getTime()
    
    
    const schendules = {
        clients_id: req.body.clients_id,
        services_id: req.body.services_id,
        employees_id: req.body.employees_id, 
        startDate : timeSTMP, 
        finishDate : (timeSTMP + (((60*1000)*60)-1000)), // transforma em timestramp e remove 1 segundo no tempo final.
        observation: req.body.observation,
    }

    //console.log(services)
    const { _id} = req.body
    if(_id == '')
        new Schendules({...schendules}).save()
    .then(data => res.redirect('/schendules'))
    .catch(err => console.log('erro durante a insersão de dados: \n', err))
    else
    Schendules.findByIdAndUpdate(_id, schendules)
    .then(data => res.redirect('/schendules'))
    .catch(err => console.log('erro durante a atualização de dados: \n', err))
})

module.exports = router