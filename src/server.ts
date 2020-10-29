import express, { json, Express } from 'express'
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import swaggerjson from './swagger-docs/swagger.json';
import { Server } from 'http';

import MovimentacoesController from './Controllers/Movimentacoes.Controller';
import CategoriaController from './Controllers/Categoria.Controller';

class Servidor{
    public app: express.Application;   
    public httpServer: Server;     
    private port = process.env.PORT || 9000;
    constructor(){
       this.app = express();
       this.Middlewares();
       this.Rotas();
       
    }
    
    private Middlewares(){
        //config
        this.app.use(json());
        this.app.use(cors());
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerjson));
    }

    private Rotas(){        
        //rotas
        this.app.get('/', (req, res)=> {res.json({"Mensagem": "Seja bem vindo(a) a API vcaxa.dev", "Documentação": `/api-docs`})})
        //movimentacao
        this.app.get('/movimentacoes', MovimentacoesController.Listar);
        this.app.get('/movimentacoes/:categoria_id', MovimentacoesController.BuscaPorCategoria);
        this.app.post('/movimentacoes', MovimentacoesController.CriaMovimentacao);
        //categoria
        this.app.get('/categorias', CategoriaController.Listar);
        this.app.post('/categorias', CategoriaController.CriarCategoria);
    }

    Start(){
        //inicializacao        
        this.httpServer = this.app.listen(this.port, ()=> console.log(`servidor rodando na porta ${this.port}`));
    }

    Close(){
        if (this.httpServer)
            this.httpServer.close();
    }
}

export default Servidor;