import { Request, Response } from 'express';
import Movimentacao from '../Models/Movimentacoes';

export default {
    async index(req: Request, res: Response){
        try {
            var movimento = new Movimentacao();
            const { soma, movimentacao } = await movimento.BuscaTodos();
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
            var movimento = new Movimentacao();
            const { rows } = await movimento.BuscarPorCategoria(categoria);

            res.status(200).json({
                "movimentoDia": rows
            });
        } catch (error) {
            res.status(400).json({"error": error, "message": 'Falha. Movimentação não encontrada.'});
        }
    },
    async create(req: Request, res: Response){
        try {
            const { descricao, categoria, entrada, saida } = req.body;

            var movimento = new Movimentacao();
            movimento.descricao = descricao;
            movimento.categoria = categoria;
            movimento.entrada = entrada;
            movimento.saida = saida;
            //insere na base de dados
            const response = await movimento.Inserir();
            
            res.status(201).json({"status": "ok", "movimentacao": response});
        } catch (error) {
            res.status(400).json({"error": error, "message": 'Falha. Dados incorretos.'});
        }
    },
}