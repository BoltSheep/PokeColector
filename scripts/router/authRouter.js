import express from 'express'
import authControler from '../controler/authControler.js'
const router = express.Router()

router.post('/login', authControler.login)
router.get('/logout', authControler.logout)

router.post('/register', authControler.register)

export default router