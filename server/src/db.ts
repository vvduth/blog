import {Pool} from 'pg'

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'newBlog',
    password: 'gpahigh5',
    port: 5432
  })