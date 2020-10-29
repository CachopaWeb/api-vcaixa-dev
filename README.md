> API vcaixa.dev versão 1.0.0

API para a criação de movimentações para controle de caixa.

## Requisitos

Para executar o projeto vcaixa.dev, você precisará da ferramenta de execução de scripts Javascript Node JS,
do gerenciador de pacotes e dependêncas npm, ou se preferir usar o yarn:
`node, npm, yarn`.

## Execução

```bash
#Crie uma nova pasta e clone o repositório https://github.com/CachopaWeb/api-vcaixa-dev.git
git clone https://github.com/CachopaWeb/api-vcaixa-dev.git
#navegue ate a pasta
cd api-vcaixa-dev
# Instalar os módulos dependentes
npm install ou yarn
# Para executar em modo de desenvolvimento:
npm dev ou yarn dev
```
## Funcionalidades
- [x] Cadastro de Movimentações e consultas, podendo filtrar por data e categoria
- [x] Cadastro de Categorias e consultas, para melhor controle das movimentações.

## Teste de integração

Para executar os testes de integração faça da seguinte forma:
```bash
# Usa o framework Jest para executar os testes
npm jest ou yarn jest
```

## Documentação

Para visualizar a documentação navegue até [/api-docs], lá estará uma documentação gerada
utilizando o Swagger-docs, com todas as rotas da aplicação