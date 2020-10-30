const dotenv = require('dotenv')
const pg = require('pg')
dotenv.config()

const conexao = new pg.Client({
   connectionString: 'postgres://oyeagktdfevyzv:84cad75cdd2217f7c32e480b0d845cec553151f824636e34d2d41abf517790d5@ec2-54-237-155-151.compute-1.amazonaws.com:5432/d25rofu8at71sa'
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