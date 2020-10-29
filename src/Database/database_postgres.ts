import { Client } from 'pg'

const conexao = new Client({
   connectionString: process.env.DATABASE_URL || 'postgres://postgres:022693@localhost:5432/vcaixa.dev'
});

conexao.connect();

async function query(sql: any){
   return await conexao.query(sql);
   conexao.end();
}

export default {
   query: query
}
