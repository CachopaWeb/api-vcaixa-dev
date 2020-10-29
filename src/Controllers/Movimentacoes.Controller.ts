import { Request, Response } from 'express';
import RepositoryMovimentacao from '../Repositories/Movimentacao.Repository';
import Movimentacao from '../Models/Movimentacoes';
import Categoria from '../Models/Categoria';

export default {
    async Listar(req: Request, res: Response){
        try {
            const { dataInicial, dataFinal } = req.query;
            var respository = new RepositoryMovimentacao();
            const { saldo, novo_movimentacoes } = await respository.BuscaMovimentacao(dataInicial as String, dataFinal as String);
            res.status(200).json({
                "saldoTotal": saldo,
                "movimentacoes": novo_movimentacoes
            });
        } catch (error) {
            res.status(400).json({"error": error, "message": 'Falha. Movimentação não encontrada.'});
        }
    },
    async BuscaPorCategoria(req: Request, res: Response){
        try {
            const { categoria_id } = req.params;
            console.log(categoria_id)
            if (!categoria_id){
                throw new Error('Id da Categoria não informado!')
            }                
            var respository = new RepositoryMovimentacao();
            const response = await respository.BuscarPorCategoria(categoria_id);

            res.status(200).json({
                "movimentacoes": response
            });
        } catch (error) {
            res.status(400).json({"error": error, "message": 'Falha. Movimentação não encontrada.'});
        }
    },
    async CriaMovimentacao(req: Request, res: Response){
        try {
            const { descricao, tipo, categoria_id, valor } = req.body;
            var movimento = new Movimentacao(); 
            movimento.data = new Date();
            movimento.descricao = descricao;
            var categoria = new Categoria();
            categoria.id = categoria_id;
            movimento.categoria = categoria;
            movimento.tipo  = tipo;
            movimento.valor = valor;
            //insere na base de dados
            var respository = new RepositoryMovimentacao();
            const response = await respository.Inserir(movimento);
            ////            
            res.status(201).json({"status": "ok", "movimentacoes": response});
        } catch (error) {
            res.status(400).json({"error": error, "message": 'Falha. Dados incorretos.'});
        }
    },
}