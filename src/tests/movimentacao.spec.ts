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
        const response = await request(servidor.app).get('/movimentacoes/recebimentos');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('movimentacao');
    });

    it('Testando a rota que busca a movimentação do por período.', async ()=> {
        const dataInicial = new Date().toDateString();
        const dataFinal = new Date().toDateString();
        const response = await request(servidor.app).get('/movimentacoes').query(`?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('movimentacao');
    });

    it('Testando a inserção de um novo movimento.', async ()=>{
        const response = await request(servidor.app).post('/movimentacoes').send({
            "descricao": "RC - CONSUMIDOR",
            "categoria": "RECEBIMENTO",
            "entrada": 500,
            "saida": 0
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('movimentacao');
    });

    it('Testando a rota que busca por uma determinada categoria.', async ()=> {
        const categoria = 'recebimento';
        const response = await request(servidor.app).get(`/movimentacoes/${categoria}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('movimentacao');
    })    
}
);