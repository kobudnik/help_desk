import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.POSTGRES_HOST || 'postgres';
const user = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASS || 'postgres';
const database = process.env.POSTGRES_NAME || 'db_desk';
const port = Number(process.env.POSTGRES_PORT) || 5432;
const devConnectionString = `${host}://${user}:${password}@127.0.0.1:${port}/${database}`;
const connectionString =
  process.env.NODE_ENV === 'production'
    ? process.env.CONNECTION_STRING
    : devConnectionString;

const pool = new Pool({
  connectionString,
});

export default {
  query: async (text: string, params?: any, callback?: any): Promise<any> => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
