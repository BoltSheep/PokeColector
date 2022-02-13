// módulos da plataforma
import path from 'path'

// módulos npm
import express from 'express'
import hbs from 'hbs'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import session from 'express-session'
import methodOverride from 'method-override'
import flash from 'connect-flash'


// a definição das rotas de cada "entidade" está isolada em seu próprio arquivo
// de forma a tornar o código do projeto organizado
import index from './router/index.js'
import authRouter from './router/authRouter.js'
import trainerRouter from './router/trainerRouter.js'
import pokedexRouter from './router/pokedexRouter.js'



const app = express()
const __dirname = './'

// configura a pasta que contém as views e o handlebars como templating engine
app.set('views', `${__dirname}/pags`)
app.set('view engine', 'hbs')
hbs.registerPartials(`${__dirname}/views/partials`, console.error)
app.set('json spaces', 2);

// possibilita enviar um DELETE via formulário,
// quando é um POST com ?_method=DELETE na querystring
//
// isto é necessário porque formulários aceitam apenas GET e POST
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }))
app.use(logger('dev'))                                    // registra tudo no terminal
app.use(express.json())                                   // necessário pra POST, PUT, PATCH etc.
app.use(express.urlencoded({ extended: false }))
app.use(session({                                         // necessário para flash()
  secret: 'lalala',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())                                          // necessário para msgs efêmeras
app.use(cookieParser())                                   // para leitura do cookie
app.use(express.static(path.join(__dirname, 'public')))   // serve arquivos estáticos


// configura as rotas "de cada entidade" da aplicação (separadinho, organizado)
app.use('/', index)
app.use('/auth', authRouter)
app.use('/trainer', trainerRouter)
app.use('/pokedex', pokedexRouter)


export default app
