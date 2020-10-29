import { Request, Response, response } from "express";
import CategoriaRepository from "../Repositories/Categoria.Repository";
import Categoria from "../Models/Categoria";

export default {
    async Listar(req: Request, res: Response){
        try {
            var repository = new CategoriaRepository();
            var response = await repository.Listar();
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({"message": "Falha. Categoria não encontrada!", "error": error})
        }
    },
    async CriarCategoria(req: Request, res: Response){
        try {
            const { name } = req.body;
            var repository = new CategoriaRepository();
            var obj_categoria = new Categoria();
            obj_categoria.name = name;
            var response = repository.Inserir(obj_categoria);
            res.status(201).json(response);
        } catch (error) {
             res.status(400).json({"message": "Falha. Erro ao inserir categoria.", "error": error})
        }
    }
}