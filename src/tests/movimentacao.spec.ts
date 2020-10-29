import request from 'supertest';

import server from '../index';


beforeAll(async ()=> console.log('Iniciando testes para API vcaixa.dev...'))

afterAll(()=> {
    server.close();
    console.log('Fim dos testes')
});

describe('Inicio dos teste na rota de Movimentações.', ()=>{
    it('Testando a rota inicial da API.', async ()=> {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Seja bem vindo(a)');
    });

    it('Testando a rota que busca todas as movimentações.', async ()=> {
        const response = await request(server).get('/movimentacoes');
        expect(response.status).toBe(200);
        // expect(JSON.parse(response.text)).toBeDefined();
    });

    it('Testando a inserção de um novo movimento.', async ()=>{
        const response = await request(server).post('/movimentacoes').send({
            "descricao": "RC - CONSUMIDOR",
            "categoria": "RECEBIMENTO",
            "entrada": 500,
            "saida": 0
        });
        expect(response.status).toBe(201);
        expect(response.text).toContain('RECEBIMENTO');
        // expect(JSON.parse(response.text)).toBeDefined();
    });

    it('Testando a rota que busca por uma determinada categoria.', async ()=> {
        const response = await request(server).get('/movimentacoes/recebimento');
        expect(response.status).toBe(200);
        // expect(JSON.parse(response.text)).toBeDefined();
    })    
}
);