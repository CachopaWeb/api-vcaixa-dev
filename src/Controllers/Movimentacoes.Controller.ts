import { Request, Response } from 'express';

import IMovimentacao from '../Models/Movimentacoes';
import db from '../Database/database_postgres';

const sql_select = 'SELECT MOV_CODIGO, MOV_DATA, MOV_DESCRICAO, MOV_CATEGORIA, MOV_ENTRADA, MOV_SAIDA, MOV_SALDO_ANTERIOR FROM MOVIMENTACOES';

const sql_select_category = 'SELECT MOV_CODIGO, MOV_DATA, MOV_DESCRICAO, MOV_CATEGORIA, MOV_ENTRADA, MOV_SAIDA, MOV_SALDO_ANTERIOR FROM MOVIMENTACOES WHERE MOV_CATEGORIA LIKE $1';

const sql_insert = 'INSERT INTO MOVIMENTACOES(MOV_DESCRICAO, MOV_DATA, MOV_CATEGORIA, MOV_ENTRADA, MOV_SAIDA, MOV_SALDO_ANTERIOR)'
                  +'VALUES ($1, $2, $3, $4, $5, $6)';

export default {
    async index(req: Request, res: Response){
        try {
            var soma: number = 0.0000;
            const { rows } = await db.query(sql_select);
            var movimentacao: any[] = [...rows];
            if (movimentacao){
                movimentacao.map((mov: IMovimentacao)=> {
                    soma += mov.mov_entrada - mov.mov_saida;
                })            
            }
            res.status(200).json({
                "saldoTotal": soma,
                "movimentoDia": movimentacao
            });
        } catch (error) {
            res.status(400).json({"error": error, "message": 'Falha. Movimentação não encontrada.'});
        }
    },
    async find_category(req: Request, res: Response){
        try {
            const { categoria } = req.params;
            if (!categoria){
                throw new Error('Categoria não informada!')
            }                
            console.log(categoria)
            const { rows } = await db.query(sql_select_category, [`%${categoria.toUpperCase()}%`]);
            console.log(rows)
            var movimentacao: any[] = [...rows];
            
            res.status(200).json({
                "movimentoDia": movimentacao
            });
        } catch (error) {
            res.status(400).json({"error": error, "message": 'Falha. Movimentação não encontrada.'});
        }
    },
    async create(req: Request, res: Response){
        try {
            const { mov_descricao, mov_categoria, mov_entrada, mov_saida } = req.body as IMovimentacao;
            var saldoAnt: number = 0.0;
            const { rows: mov } = await db.query(sql_select);
            var movimentacao: any[] = [...mov];            
            if (movimentacao){
                movimentacao.map((movimento: IMovimentacao)=> {
                    saldoAnt += movimento.mov_entrada - movimento.mov_saida;
                })            
            }

            const novo_movimento: IMovimentacao = {
              mov_descricao,
              mov_data: new Date(),
              mov_categoria,
              mov_entrada,
              mov_saida,
              mov_saldo_anterior: saldoAnt
            }
            const { rowCount } = await db.query(sql_insert, [
                mov_descricao,
                new Date(),
                mov_categoria.toUpperCase(),
                mov_entrada,
                mov_saida,
                saldoAnt
            ]);
            res.status(201).json({"status": "ok", novo_movimento, rowCount});
        } catch (error) {
            res.status(400).json({"error": error, "message": 'Falha. Dados incorretos.'});
        }
    },
}