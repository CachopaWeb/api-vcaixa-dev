# Teste API Caixa virtual

## Requisito funcional
[x] O usuário deve ser capaz de cadastrar entradas e saídas categorizadas.
[x] O usuário deve ser capaz de visualizar os conteúdo armazenado através de uma API podendo usar filtros de data e por categoria.

## Requisito não-funcional
* Node.js, express e typescript 
* Banco de dados Postgres
* Teste de integração 
* Documentação - Swagger docs
* Publicar o projeto no github
* Hospedar a aplicação no Heroku ou AWS
## Regra de negócio
* Criar métodos para inserção de dados (Post), e consulta (Get) para a rota `/movimentacoes`
* Trazer na consulta (Get) resumo da carteira com: Saldo Total e as movimentações do dia, podendo ser filtradas por data e por categoria.