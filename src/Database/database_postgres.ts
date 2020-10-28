import { Pool } from 'pg'

const conexao = new Pool({
   connectionString: process.env.DATABASE_URL
});

conexao.on('connect', ()=> console.log('Banco de dados conectado com sucesso!'));

export default {
   query: (sql: any, parms?: any) => conexao.query(sql, parms)
}
