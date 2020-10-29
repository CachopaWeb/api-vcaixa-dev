import db from '../Database/database_postgres';

const sql_select = 'SELECT codigo, data, descricao, categoria, entrada, saida, saldo_anterior FROM MOVIMENTACOES';


class Movimentacao {
    public codigo?: number;

    public data: Date;

    public descricao: String;

    public categoria: String;

    public entrada: number;

    public saida: number;

    public saldo_anterior: number;

    async Inserir() {
        try {
            var saldoAnt: number = 0.0
            const { rows: mov } = await db.query(sql_select);
            if (mov) {
                mov.map((movimento: Movimentacao) => {
                    saldoAnt += movimento.entrada - movimento.saida;
                })
            }
            //insere registros no banco de dados
            const { rows } = await db.query(`
                INSERT INTO MOVIMENTACOES(descricao, data, categoria, entrada, saida, saldo_anterior) 
                VALUES (
                   '${this.descricao}', 
                   '${(new Date()).toLocaleDateString()}', 
                   '${this.categoria.toUpperCase()}', 
                    ${this.entrada}, 
                    ${this.saida}, 
                    ${saldoAnt}
                )
                returning *
            `);

            return rows;
        } catch (error) {
            console.log("Erro ao inserir registro no banco de dados\n"+error)
        }
    }

    async BuscaTodos(){
        var soma = 0.0;
        const { rows } = await db.query(sql_select);
        var movimentacao: any[] = [...rows];
        if (movimentacao){
            movimentacao.map((mov: Movimentacao)=> {
                soma += mov.entrada - mov.saida;
            })            
        }
        return {
            soma,
            movimentacao
        }
    }

    async BuscarPorCategoria(categoria: String){
        const { rows } = await db.query(`
            SELECT codigo, data, descricao, categoria, entrada, saida, saldo_anterior 
            FROM MOVIMENTACOES WHERE categoria LIKE '%${categoria.toUpperCase()}%'
        `);            
        return {
           rows
        };
    }
}

export default Movimentacao;