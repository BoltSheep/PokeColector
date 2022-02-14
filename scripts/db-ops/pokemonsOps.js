import db from'../../db.js'

const expand = pokemon => ({
    ...pokemon,
    dexPicture: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemon.id).padStart(3,'0')}.png`
})

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  

const pokemonsOps = {
    get:async id => {
        const [pokemon] = await db.execute({
            sql: `SELECT * FROM pokemon where id = ${id}`
            })
            if (pokemon.length == 0){
                throw new Error('Problema ao recuperar pokemons') 
        }

        const pokemonExpanded = expand(pokemon[0])

        return pokemonExpanded
    },
    
    getAll: async () => {
        const [pokemon] = await db.execute({
            sql: `SELECT * FROM pokemon`
        })
        const pokemonExpanded = pokemon.map(expand)

        return pokemonExpanded
    },

    drawThree: async () => {
        const ids = []
        for (let i = 0; i < 3; i++){
            const randomizer = Math.ceil(Math.random()*898)
            console.log(randomizer)
            if (randomizer == 0) {
                ids.push(1)
            } else {
              ids.push(randomizer)  
            }  
        } 
        const [wildPokemons] = await db.execute({
            sql: `SELECT * FROM pokemon where id IN (${ids[0]}, ${ids[1]}, ${ids[2]})`
        })
        if (wildPokemons.length <3){
            throw new Error('Problema ao recuperar pokemons') 
        }
        return wildPokemons.map(expand)
    },

    drawStarter: async () => {
        const ids = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501, 650, 653, 656, 722, 725, 728, 810, 813, 816]
        shuffle(ids)
        const [starterPokemons] = await db.execute({
            sql: `SELECT * FROM pokemon where id IN (${ids[0]}, ${ids[1]}, ${ids[2]})`
        })
        if (starterPokemons.length <3){
            throw new Error('Problema ao recuperar pokemons') 
        }
        return starterPokemons.map(expand)
    },
    
}

/* const main = async() => {
    console.log((await pokemonsOps.get(1)))
    console.log(await pokemonsOps.get(2))
    console.log(await pokemonsOps.drawThree())
} */

//main()

export default pokemonsOps