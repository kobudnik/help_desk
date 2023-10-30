import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.POSTGRES_HOST || 'localhost';
const user = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASS || 'postgres';
const database = process.env.POSTGRES_NAME || 'db_desk';
const port = Number(process.env.POSTGRES_PORT) || 5432;

const pool = new Pool({
  host,
  user,
  password,
  database,
  port,
});

export default {
  query: async (text: string, params?: any, callback?: any): Promise<any> => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
