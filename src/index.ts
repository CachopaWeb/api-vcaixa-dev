import express, { json } from 'express'
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import swaggerjson from './swagger-docs/swagger.json';
import dotenv from 'dotenv';

dotenv.config();

import MovimentacoesController from './Controllers/Movimentacoes.Controller';

const app = express();
//config
app.use(json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerjson));

//rotas
app.get('/movimentacoes', MovimentacoesController.index);
app.get('/movimentacoes/:categoria', MovimentacoesController.find_category);
app.post('/movimentacoes', MovimentacoesController.create);

//inicializacao
const port = process.env.PORT || 9000;
app.listen(port, ()=> console.log(`servidor rodando na porta ${port}`));