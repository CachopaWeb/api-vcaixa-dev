import { Client } from 'pg'

const conexao = new Client({
   connectionString: process.env.DATABASE_URL || 'postgres://oyeagktdfevyzv:84cad75cdd2217f7c32e480b0d845cec553151f824636e34d2d41abf517790d5@ec2-54-237-155-151.compute-1.amazonaws.com:5432/d25rofu8at71sa'
});

conexao.connect().then(()=> console.log('banco de dados conectado com sucesso!'));;

async function query(sql: any){
   return await conexao.query(sql);
   conexao.end();
}

export default {
   query
}
