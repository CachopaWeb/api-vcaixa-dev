import dotenv from 'dotenv';
dotenv.config();

import Servidor from './server';

//instancia a classe server
var app = new Servidor();
//inicia o servidor
app.Start();

