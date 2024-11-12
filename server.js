/* IMPORTAÇÃO DOS MODULSO */
const express = require('express') // importação do módulo express
const path = require('path') // importacao do modulo path
const { engine, ExpressHandlebars } = require('express-handlebars') // importação do módulo handlebars
const bodyParser = require('body-parser') // importação do módulo body-parser
const cookieParser = require('cookie-parser')

//importando arquivo do Bd
const connectDb = require('./bd')

// controllers de login e logout
const usersLoginRoutes = require('./controllers/users.login.controller')
const usersLogedRoutes = require('./controllers/users.loged.controller')

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
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

//rotas
app.use('/dashboard/', dashboardRoutes)
app.use('/users/',usersLoginRoutes)
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

app.get('/login', async (req, res) => {
    const msgClass = req.cookies.msgClass
    const message = req.cookies.message
    res.render('users/login', { title: "Login", page: "Login", login: true, msgClass: msgClass, message: message})
})

app.get('/logout', async(req, res) => {
    res.clearCookie('auth')
    res.clearCookie('token')
    res.redirect('/dashboard')
})

app.get('/', usersLogedRoutes, (req, res) => {
    res.redirect('/dashboard')
})

/* // utilizado para gerar uma senha para o primeiro usuário
const saltRounds = 10;
bcrypt.hash('123qwe', saltRounds, function (err,   hash) {
    console.log(hash)
})*/