import express from 'express'
import authControler from '../controler/authControler.js'
const router = express.Router()

router.use(authControler.softValidate)

router.get('/', (req, res) => {
    res.render('index', {
        isLoggedIn: req.isLoggedIn, 
        trainer: req.user
    })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

router.get('/regras', (req, res) => {
    res.render('regras', {
        isLoggedIn: req.isLoggedIn, 
        trainer: req.user
    })
})

router.get('/thiago', (req, res) => {
    res.render('thiago', {
        isLoggedIn: req.isLoggedIn, 
        trainer: req.user
    })
})

export default router
