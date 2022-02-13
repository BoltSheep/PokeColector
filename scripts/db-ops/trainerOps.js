import db from'../../db.js'

const trainerOps = {
    get:async (column, value) => {
        const [trainerInfo] = await db.execute({
            sql: `SELECT * FROM trainer where ${column} = '${value}'`
          })
          if (trainerInfo.length == 0){
              throw new Error('Problema ao recuperar o treinador') 
          }
          return trainerInfo[0]
    },

    getById: async (id) => trainerOps.get('id', id),
    getByUsername: async (username) => trainerOps.get('username', username),
    getByEmail: async (email) => trainerOps.get('email', email),
    
    checkAlreadyExists: async (email, username) => {
        const [traincerInfo] = await db.execute ({
            sql: `SELECT * FROM trainer WHERE email = '${email}' OR username = '${username}'`
        })
        return traincerInfo.length != 0
    },

    insert: async ({username, email, hash, realName}) => {
        const transaction = await db.getConnection()
        await transaction.beginTransaction()
        const [insertResult] = await transaction.execute(
            `INSERT INTO trainer (id, nameReal, username, hash, email, energia, perfilPictureUrl)
             VALUES (NULL, ?, ?, ?, ?,5,NULL)`,
            [realName, username, hash, email]
          )
      
          if (!insertResult || insertResult.insertedRows < 1) {
            throw new Error(`nao foi possivel inserir novo usuario`)
          }
          await transaction.commit()
    },

    getAvailable: (trainer) => {

        for (let i = 1; i < 7; i++) {
            const pokemonField = 'pokemon'+i
            if (!trainer[pokemonField]) return i
        }
        throw new Error('Sem posição disponivel')
    },

    updatePokemonSpot: async (trainerId, position, pokemonId) => {
        const transaction = await db.getConnection()
        await transaction.beginTransaction()
        const [updateResult] = await transaction.execute(
            `UPDATE trainer SET pokemon${position} = ? WHERE id = ?`,
            [pokemonId, trainerId]
          )
          console.log(updateResult)
          if (updateResult.affectedRows != 1) {
            throw new Error(`nao foi possivel atualizar usuario`)
          }
          await transaction.commit()
    },

    sendToPc: async (trainerId) => {
        const transaction = await db.getConnection()
        await transaction.beginTransaction()
        const [updateResult] = await transaction.execute(
            `UPDATE trainer SET 
            pokemon2 = NULL, 
            pokemon3 = NULL, 
            pokemon4 = NULL, 
            pokemon5 = NULL, 
            pokemon6 = NULL WHERE id = ? `,
            [trainerId]
          )
          console.log(updateResult)
          if (updateResult.affectedRows != 1) {
            throw new Error(`nao foi possivel enviar para o pc`)
          }
          await transaction.commit()
    },

    updateTrainer: async ({trainerId, nameReal, profilePic}) => {
        const transaction = await db.getConnection()
        await transaction.beginTransaction()
        const [updateResult] = await transaction.execute(
            `UPDATE trainer SET 
            nameReal = ?, 
            perfilPictureUrl = ? 
            WHERE id = ? `,
            [nameReal, profilePic, trainerId]
          )
          console.log(updateResult)
          if (updateResult.affectedRows != 1) {
            throw new Error(`nao foi possivel atualizar seu perfil`)
          }
          await transaction.commit()
    }




}

/*async function main() {
    console.log((await trainerOps.getById(1)))
    console.log((await trainerOps.getByUsername('BoltSheep')))
    console.log((await trainerOps.getByEmail('thidampe@gmail.com')))
    console.log((await trainerOps.getById(10)))
}

main()*/

export default trainerOps