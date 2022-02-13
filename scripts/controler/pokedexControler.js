import pokemonsOps from "../db-ops/pokemonsOps.js"
import trainerOps from "../db-ops/trainerOps.js"

export default {
    pokedex: async(req, res) => {
        const pokemons = await pokemonsOps.getAll()
        if (req.isLoggedIn) {
            const trainer = await trainerOps.getById(req.userId)
            res.render ('pokedex', {pokemons , trainer, isLoggedIn: req.isLoggedIn})
        } else {
            res.render('pokedex', {pokemons, isLoggedIn: req.isLoggedIn}) 
        }   
    }
}