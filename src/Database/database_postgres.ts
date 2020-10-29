import { Client } from 'pg'

const conexao = new Client({
   connectionString: process.env.DATABASE_URL
});

conexao.connect();

async function query(sql: any){
   return await conexao.query(sql);
}

export default {
   query: query
}
