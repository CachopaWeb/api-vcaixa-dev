import db from '../Database/database_postgres';

const drop_query = `
	DROP TABLE MOVIMENTACOES;
`;

const query: string = 
`CREATE TABLE MOVIMENTACOES( 
	 codigo SERIAL PRIMARY KEY,
	 data DATE,
	 descricao VARCHAR(50),
	 categoria VARCHAR(30),
	 entrada NUMERIC(12,4),
	 saida NUMERIC(12,4),
	 saldo_anterior NUMERIC(12,4)
);`;

async function dropTable(){
	const response = await db.query(drop_query);
	console.log('tabela movimentações deletada com sucesso!\n'+response)
}

async function createTable(){
	const response = await db.query(query);
	console.log('tabela movimentações criada com sucesso!\n'+response)

}

(
	async ()=>{
	  try {
		  dropTable();
		  createTable();
	  } catch (error) {
		  console.log('erro ao deletar e criar tabela de movimentações!\n'+error)
	  }
	  
	}
)()