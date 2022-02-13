import pokemonsOps from "../db-ops/pokemonsOps.js"
import trainerOps from "../db-ops/trainerOps.js"

export default {
    perfil: async (req,res) => {
        const trainer = req.user
        trainer.pokemons = []
        
        for (let i = 1; i < 7; i++) {
            const pokemonField = 'pokemon'+i
            if (trainer[pokemonField]) trainer.pokemons.push(await pokemonsOps.get(trainer[pokemonField]))
        }
        res.render('perfil', {trainer: {
            ...trainer,
            perfilPictureUrl: trainer.perfilPictureUrl ?? '../imgs/iconUser.png' 
        }})
    },

    aventurar: async (req, res) => {
        const trainer = req.user
        res.render('aventura', {
            trainer,
            wildPokemons: req.flash('wildPokemons' )
        })
    },

    encontrar: async (req, res) => {
        const wildPokemons = await pokemonsOps.drawThree()
        req.flash('wildPokemons',wildPokemons)
        res.redirect('/trainer/aventurar')
    },

    catch: async(req,res) => {
        try {
            const availableSpot = trainerOps.getAvailable(req.user)
            console.log(availableSpot)
            const pokemonId = req.body.pokemonId
            console.log(pokemonId)
            console.log(req.userId)
            await trainerOps.updatePokemonSpot(req.userId, availableSpot, pokemonId)
            res.redirect('/trainer/perfil')
        } catch (error) {
            res.redirect('/trainer/aventurar')
        }
    },

    sendToPc: async (req, res) => {
        try {
            await trainerOps.sendToPc(req.userId)
            res.redirect('/trainer/perfil') 
        } catch (error) {
            res.redirect('/trainer/perfil') 
        }
    },

    startEdit: (req, res) => {
        res.render('editarPerfil', {trainer: req.user})
    },

    finishEdit: async(req, res) => {
        try {
            const trainerId = req.userId
            let nameReal = req.body.nameReal
            let profilePic = req.body.pic 
            
            console.log(nameReal)
            console.log(profilePic)

            if (nameReal == '') nameReal = req.user.nameReal
            if (profilePic == '') profilePic = req.user.perfilPictureUrl
            
            console.log('depois',nameReal)
            console.log('depois',profilePic)

            await trainerOps.updateTrainer({trainerId, nameReal, profilePic})

            res.redirect('/trainer/perfil')  
        } catch (error) {
            console.log(error)
            res.redirect('/trainer/perfil') 
        }
    }
}