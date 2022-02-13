import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import trainerOps from '../db-ops/trainerOps.js'
import pokemonsOps from '../db-ops/pokemonsOps.js'

const jwtSecret = 'segredomuitoseguro'

const authControler = {
    login: async (req, res) => {
        try {
          const username = req.body.username;
          const password = req.body.password;  
          const user = await trainerOps.getByUsername(username);
          if (bcrypt.compareSync(password, user.hash)){
            const token = await jwt.sign({
                id: user.id
            }, jwtSecret)
            res.cookie('token', token)
            res.redirect('/trainer/perfil')
          } else {
              throw new Error('senha ou usario incorreto')
          }
        } catch (error) {
            res.redirect('/login')
        }
    },

    validate: async(req, res, next) => {
      try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, jwtSecret)
        req.userId = decoded.id
        req.user = await trainerOps.getById(decoded.id)
        next()
      } catch (error) {
        res.clearCookie('token')
        res.redirect('/login')
      }
    },

    softValidate: async(req, res, next) => {
      try {
        const token = req.cookies.token
        if(token){
          const decoded = jwt.verify(token, jwtSecret)
          req.userId = decoded.id
          req.user = await trainerOps.getById(decoded.id)
        }
        req.isLoggedIn = token != undefined
        next()
      } catch (error) {
        res.clearCookie('token')
        res.redirect('/login')
      }
    },

    logout: async(req, res) => {
      res.clearCookie('token')
      res.redirect('/')
    },

    register: async(req,res) => {
      try {
        const username = req.body.username;
        const password = req.body.password; 
        const email = req.body.email;
        const realName = req.body.name;
        if (await trainerOps.checkAlreadyExists(email, username)) throw new Error('Usuario ou email já existentes')

        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(password, salt)

        await trainerOps.insert({username, hash, email, realName})
        const newUser = await trainerOps.getByUsername(username)
        
        const token = await jwt.sign({
          id: newUser.id
        }, jwtSecret)
        res.cookie('token', token)
        
        const startPokemons = await pokemonsOps.drawStarter()
        req.flash('wildPokemons',startPokemons)
        res.redirect('/trainer/aventurar')

      } catch (error) {
        res.redirect('/cadastro')
      }  
    }
}

export default authControler
