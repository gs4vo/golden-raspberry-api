API simples para consultar os intervalos entre prêmios dos produtores do Golden Raspberry Awards (Pior Filme).

## O que essa API faz?

Ela lê um arquivo CSV com os filmes indicados e vencedores, e retorna quais produtores ganharam prêmios com o menor e maior intervalo de tempo entre eles.

## Tecnologias usadas

* Node.js
* TypeScript
* Express
* lowdb (banco de dados em memória)
* Jest (para testes)

## Como rodar o projeto

### 1. Instalar as dependências

```bash
npm install
```

### 2. Rodar o servidor

```bash
npm run dev
```

O servidor vai iniciar na porta 3000.

### 3. Testar a API

Acesse no navegador ou use o curl:

```bash
curl http://localhost:3000/producers/intervalos
```

A resposta vai ser algo assim:

```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}
```

## Como rodar os testes

```bash
npm test
```

Os testes vão verificar se a API está retornando os dados corretamente.

## Estrutura do projeto

```
src/
├── app.ts            # Configuração do Express
├── server.ts         # Inicia o servidor
├── database.ts       # Configura o banco em memória
├── loaders/
│   └── csv.loader.ts # Carrega o arquivo CSV
├── models/
│   └── movies.ts     # Tipos/interfaces dos filmes
├── routes/
│   └── producers.ts  # Rota da API
└── services/
    └── award.ts      # Lógica para calcular intervalos

tests/
└── test.ts           # Testes de integração

movielist.csv         # Arquivo com os dados
```

## Arquivo CSV

O arquivo `movielist.csv` deve estar na raiz do projeto com as colunas:
* year
* title
* studios
* producers
* winner (yes/no)

