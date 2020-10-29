# Teste API Caixa virtual

## Requisito funcional
[*] O usuário deve ser capaz de cadastrar entradas e saídas categorizadas.
[*] O usuário deve ser capaz de criar categorias para organização.
[*] O usuário deve ser capaz de visualizar os conteúdo armazenado através de uma API.

## Requisito não-funcional
* Node.js, express e typescript 
* Banco de dados Postgres
* Teste unitários 
* Documentação - Swagger docs
* Publicar o projeto no github
* Hospedar a aplicação no Heroku ou AWS
* Sugestão de nome `vcaixa.dev`
## Regra de negócio
* Criar métodos para inserção de dados (Post), e consulta (Get) para a rota `/movimentacoes`
* Trazer na consulta (Get) resumo da carteira com: Saldo Total e as movimentações do dia, podendo ser filtradas
