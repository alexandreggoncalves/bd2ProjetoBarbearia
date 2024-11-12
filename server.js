/* IMPORTAÇÃO DOS MODULSO */
const express = require('express') // importação do módulo express
const path = require('path') // importacao do modulo path
const { engine, ExpressHandlebars } = require('express-handlebars') // importação do módulo handlebars
const bodyParser = require('body-parser') // importação do módulo body-parser
const cors = require('cors')
const cookieParser = require('cookie-parser')

//importando arquivo do Bd
const connectDb = require('./bd')

// controllers de login e logout
const usersLogin = require('./controllers/users.login.controller')
const usersLoged = require('./controllers/users.loged.controller')
const usersLogout = require('./controllers/users.logout.controller')

// controllers dos módulos so sistema
const dashboardRoutes = require('./controllers/dashboard.controller')
const clientsRoutes = require('./controllers/clients.controller')
const employeesRoutes = require('./controllers/employees.controller')
const servicesRoutes = require('./controllers/services.controller')

const isEqualHelperHandlerbar = function(a, b, opts) {
    if (a == b) {
        return opts.fn(this) 
    } else { 
        return opts.inverse(this) 
    } 
}

//app
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser());

//rotas
app.use('/dashboard/', dashboardRoutes)
app.use('/clients/', clientsRoutes)
app.use('/employees/', employeesRoutes)
app.use('/services/', servicesRoutes)

//configuração das view engine para o handlebar
app.set('views', path.join(__dirname, 'views'))

app.use('/static', express.static(path.join(__dirname, 'assets')))

app.engine('.hbs', engine({
    extname: "hbs", // index.hbs
    layoutDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'mainLayout.hbs',
    partialsDir  : [
        //  path to your partials
        path.join(__dirname, 'views/layouts/partials'),
    ],
    helpers: {
        toJSON : function(object) {
          return JSON.stringify(object);
        }, 
        if_equal : isEqualHelperHandlerbar, 
    }
}))

app.set('view engine', '.hbs')

//habilitar coneão com BD e o servidor da aplicação
connectDb().then(data => {
    console.log('>> Banco de dados conectado com sucesso.')
    app.listen('8000', ()=> {
        console.log('>> Servidor está em execução na porta 8000.')
    }).on('erro', err => {
        console.log('>> Erro ao conectar ao servidor! \n', err)
    })
})
.catch(err => console.log('>> Não foi possível conecta ao Bd" \n', err))

// rotas de login e logour
app.post('/users/login', async(req, res) => {
    res.send(await usersLogin())
})

app.get('/users/logout', async(req, res) => {
    res.send(await usersLogout())
})

app.get('/', (req, res) => {
    res.redirect('/dashboard')
})