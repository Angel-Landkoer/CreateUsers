import { createClient } from '@libsql/client'
import { randomUUID } from 'node:crypto'

const turso_db_url = process.env.TURSO_DATABASE_URL ?? ""
const turso_db_token = process.env.TURSO_AUTH_TOKEN ?? ""

try {
  if (!turso_db_url) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
} catch (err) {
  console.error('Error setting up the database client:', err.message);
  process.exit(1);
}


const client = createClient({
  url: turso_db_url,
  authToken: turso_db_token
})

export class UserService {
  static async getAll() {
    const result = await client.execute("SELECT * FROM users")
    console.log(result)
  }

  static async getId(id) {
    const result = await client.execute({
      sql: "SELECT * FORM users WHERE id = ?",
      args: [id]
    })
    console.log(result)
  }

  static async create(body) {
    const { name, age, email, avatar } = body
    const idR = randomUUID()
    const result = await client.execute({
      sql: "INSERT INTO users VALUES (:id, :name, :age, :email, :avatar)",
      args: { id: idR, name, age, email, avatar }
    })

    console.log(result)
  }

  static async delete(id) {
    const result = client.execute({
      sql: "DELETE FORM users WHERE id = ?",
      args: [id]
    })

    console.log(result)
  }

}
