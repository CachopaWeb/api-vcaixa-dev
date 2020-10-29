import db from '../Database/database_postgres';
import Movimentacao from '../Models/Movimentacoes';
import Categoria from '../Models/Categoria';

class MovimentacaoRepository{
    async Inserir(movimentacao: Movimentacao) {
        try {
            //insere registros no banco de dados
            const sql = `
                INSERT INTO MOVIMENTACOES(data, tipo, categoria_id, valor, descricao) 
                VALUES (
                    '${movimentacao.data.toLocaleDateString()}', 
                    '${movimentacao.tipo}', 
                     ${movimentacao.categoria.id}, 
                     ${movimentacao.valor},
                    '${movimentacao.descricao}'
                )
                returning *
            `
            const response = await db.query(sql);
            return response.rows;
        } catch (error) {
            throw new Error("Erro ao inserir registro no banco de dados\n"+error)
        }
    }

    async BuscaMovimentacao(dataInicial: String, dataFinal: String){
        try {
            var sql = `SELECT mov.id, data, tipo, descricao, cat.id categoria_id, cat.name categoria, valor FROM MOVIMENTACOES mov JOIN CATEGORIA cat ON cat.id = mov.categoria_id WHERE data = '${new Date().toLocaleDateString()}'`;
            if ((dataInicial) && (dataFinal)){
                sql = `SELECT data, tipo, descricao, cat.id categoria_id, cat.name categoria, valor FROM MOVIMENTACOES mov JOIN CATEGORIA cat on cat.id = mov.categoria_id WHERE data >= '${dataInicial}' AND data <= '${dataFinal}'`;
            }
            const response = await db.query(sql);
            var movimentacoes: any[] = [...response.rows];
            var saldo: number = 0.00;
            var novo_movimentacoes: any[] = [];
            if (movimentacoes){
                let somaSaida = 0.00;
                let somaEntrada = 0.00;
                movimentacoes.map((mov: Movimentacao)=> {  
                    if (mov.tipo.substring(0, 1).toUpperCase() === 'E')                  
                        somaEntrada += parseFloat(mov.valor.toString())
                    else
                        somaSaida += parseFloat(mov.valor.toString())  
                })   
                //calcula saldo
                saldo = somaEntrada - somaSaida;
                //cria novo objeto para formatar a saida
                novo_movimentacoes = movimentacoes.map((movimento)=>{
                    const { id: mov_id, data, tipo, descricao, categoria_id: id, categoria: name, valor } = movimento;
                    return {
                        data,
                        id: mov_id,
                        categoria: { id, name },                        
                        tipo,
                        valor,
                        descricao
                    };
                })                
            }
            return {
                saldo,
                novo_movimentacoes
            }            
        } catch (error) {
            throw new Error('erro ao buscar movimentação!\n'+error)
        }
    }

    async BuscarPorCategoria(categoria: String){
        try {
            const response = await db.query(`
                SELECT mov.id, data, tipo, descricao, cat.id categoria_id, cat.name categoria, valor 
                FROM MOVIMENTACOES mov JOIN CATEGORIA cat ON cat.id = mov.categoria_id WHERE cat.id = ${categoria}
            `);            
            ////
            var movimentacoes: any[] = [...response.rows];
            //cria novo objeto para formatar a saida
            var novo_movimentacoes: any[] = [];
            novo_movimentacoes = movimentacoes.map((movimento)=>{
                const { id: mov_id, data, tipo, descricao, categoria_id: id, categoria: name, valor } = movimento;
                return {
                    data,
                    id: mov_id,
                    categoria: { id, name },                        
                    tipo,
                    valor,
                    descricao
                };
            })
            return novo_movimentacoes;            
        } catch (error) {
            throw new Error('Erro ao busca movimentação por categoria!\n'+error);
        }
    }
}

export default MovimentacaoRepository;