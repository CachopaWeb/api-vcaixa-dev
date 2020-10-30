const dotenv = require('dotenv')
const pg = require('pg')
dotenv.config()

const conexao = new pg.Client({
   connectionString: process.env.DATABASE_URL
});

const sql_categoria = `CREATE TABLE IF NOT EXISTS CATEGORIA( 
	 id SERIAL PRIMARY KEY,
	 name VARCHAR(30)
);`

const sql_movimentacoes = `CREATE TABLE IF NOT EXISTS MOVIMENTACOES( 
	 id SERIAL PRIMARY KEY,
	 data DATE,
	 descricao VARCHAR(50),
	 tipo VARCHAR(30),
	 categoria_id int REFERENCES CATEGORIA(id),
	 valor NUMERIC(9,2)
);`

conexao.connect().then(()=> console.log('banco de dados conectado com sucesso!'));

(()=>{
	conexao.query(sql_categoria).then(()=> console.log('tabela de categorias criada com sucesso!'));
	conexao.query(sql_movimentacoes).then(()=> console.log('tabela de movimentação criada com sucesso!'));
})()