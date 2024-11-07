
/* IMPORTAÇÃO DOS MODULSO */
const express = require('express') // importação do módulo express
const path = require('path') // importacao do modulo path
const { engine, ExpressHandlebars } = require('express-handlebars') // importação do módulo handlebars
const bodyParser = require ('body-parser') // importação do módulo body-parser

//importando arquivo do Bd
const connectDb = require('./bd')
const clientsRoutes = require('./controllers/clients.controller')

//app
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//rotas
app.use('/clients/', clientsRoutes)

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
        }
    }
}))

app.set('view engine', '.hbs')

//app.use(express.static(path.join(__dirname, 'assets')))
//console.log(path.join(__dirname, '/assets'))

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

app.get('/', (req, res) => {
    res.redirect('/clients')
})