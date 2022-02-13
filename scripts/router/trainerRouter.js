import express from 'express'
import trainerControler from '../controler/trainerControler.js'
import authControler from '../controler/authControler.js'
const router = express.Router()

router.use(authControler.validate)

router.get('/perfil', trainerControler.perfil)

router.get('/aventurar', trainerControler.aventurar)

router.get('/encontrar', trainerControler.encontrar)

router.post('/catch', trainerControler.catch)

router.post('/pc', trainerControler.sendToPc)

router.get('/edit', trainerControler.startEdit)

router.post('/edit', trainerControler.finishEdit)

export default router