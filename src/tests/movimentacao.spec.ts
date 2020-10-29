import request from 'supertest';

import Servidor from '../server';

let servidor: Servidor;

beforeAll(async ()=> {
    servidor = new Servidor();
    console.log('Iniciando testes para API vcaixa.dev...')
})

afterAll(()=> {
    servidor.Close();
    console.log('Fim dos testes')
});

describe('Inicio dos teste na rota de Movimentações.', ()=>{
    it('Testando a rota inicial da API.', async ()=> {
        const response = await request(servidor.app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Seja bem vindo(a)');
    });

    it('Testando a rota que busca a movimentação do dia.', async ()=> {
        const response = await request(servidor.app).get('/movimentacoes');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('movimentacoes');
    });

    it('Testando a rota que busca a movimentação do por período.', async ()=> {
        const dataInicial = new Date().toDateString();
        const dataFinal = new Date().toDateString();
        const response = await request(servidor.app).get('/movimentacoes').query(`?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('movimentacoes');
    });

    it('Testando a inserção de um novo movimento.', async ()=>{
        const response = await request(servidor.app).post('/movimentacoes').send({
            "descricao": "RC - CONSUMIDOR",
            "tipo": "ENTRADA",
            "categoria_id": 1,
            "valor": 368.00
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('movimentacoes');
    });

    it('Testando a rota que busca por uma determinada categoria.', async ()=> {
        const categoria = '1';
        const response = await request(servidor.app).get(`/movimentacoes/${categoria}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('movimentacoes');
    })    
}
);

describe('Inicio dos testes na rota Categorias', ()=>{
    it('Testando criação de categorias', async ()=> {
        const response = await request(servidor.app).post('/categorias').send({
            "name": "RECEBIMENTO"
        })
        expect(response.status).toBe(201);
    })
    it('Testando a busca de categorias', async ()=> {
        const response = await request(servidor.app).get('/categorias');
        expect(response.status).toBe(200);
    })
})