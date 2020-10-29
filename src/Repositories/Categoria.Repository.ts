import db from '../Database/database_postgres';
import Categoria from '../Models/Categoria';

class CategoriaRepository{
    async Listar():Promise<Categoria[]> {
        try {
            //insere registros no banco de dados
            const response = await db.query(`SELECT id, name FROM CATEGORIA`);
            return response.rows;
        } catch (error) {
            throw new Error("Erro ao listar categorias\n"+error)
        }
    }
    async Inserir(categoria: Categoria) {
        try {
            //insere registros no banco de dados
            const response = await db.query(`
                INSERT INTO CATEGORIA(name) 
                VALUES (
                   '${categoria.name}'
                )
                returning *
            `);
            return response;
        } catch (error) {
            throw new Error("Erro ao inserir categoria\n"+error)
        }
    }
}

export default CategoriaRepository;