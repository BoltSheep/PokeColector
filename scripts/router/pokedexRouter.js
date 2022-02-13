import express from 'express'
import pokedexControler from '../controler/pokedexControler.js'
import authControler from '../controler/authControler.js'
const router = express.Router()

router.use(authControler.softValidate)

router.get('/', pokedexControler.pokedex)

export default router