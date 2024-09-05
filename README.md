# 🐋 Desafio Nginx com Node - Curso Full Cycle

Repositório responsável pelo desafio de Nginx com Node usando Docker do curso da Full Cycle

## Objetivo

Este projeto visa utilizar do nginx como proxy reverso. A idéia principal é que quando um usuário acesse o nginx, o mesmo fará uma chamada em nossa aplicação node.js. Essa aplicação por sua vez adicionará um registro em no banco de dados mysql, cadastrando um nome na tabela people.
O retorno da aplicação node.js para o nginx deverá ser:

```html
<h1>Full Cycle Rocks!</h1>
```

- Lista de nomes cadastradas no banco de dados.

## Como rodar

```sh
docker network create node-network
```

```sh
docker-compose up -d
```
Para acessar a aplicação:

```sh
http://localhost:8080
```

## Resultado
