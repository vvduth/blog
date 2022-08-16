import dotenv from 'dotenv'
import {Pool} from 'pg'
dotenv.config() 


const isProduction = process.env.NODE_ENV === 'production'

//const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'newBlog',
    password: 'gpahigh5',
    port: 5432
  })

