import mysql from 'mysql2/promise'

const db = mysql.createPool({
  // configuração de acesso
  host: '127.0.0.1',
  database: 'pokemons',
  user: 'root',
  password: '123456',
  port: 3306,

  // configuração das conexões
  multipleStatements: true,

  // configuração da pool
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})



/*async function main () {
    const [pokemon] = await db.execute({
        sql: 'SELECT * FROM pokemon',
    })

    console.log(pokemon)
}

main()*/

export default db