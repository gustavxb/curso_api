# API do Curso

API RESTful do curso, construída com **Fastify + TypeScript**.

## Começando

```bash
npm install     # baixa as dependências
npm run dev     # sobe a API em http://localhost:3333
```

**Pré-requisito:** Node.js na versão registrada no `.nvmrc`.

## Comandos

| Comando         | O que faz                                          |
| :-------------- | :------------------------------------------------- |
| `npm run dev`   | Sobe a API recarregando a cada alteração salva     |
| `npm run build` | Compila o TypeScript para a pasta `dist`           |
| `npm start`     | Executa a versão compilada, como roda em produção  |

## Rotas

| Método | Rota      | O que devolve                                |
| :----- | :-------- | :-------------------------------------------- |
| `GET`  | `/health` | O estado da API: status, uptime e ambiente    |