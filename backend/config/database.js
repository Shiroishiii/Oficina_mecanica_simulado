import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config()

export const db = mysql2.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'senai',
    database: process.env.DB_NAME || 'saep_db'
}); 

export default db;