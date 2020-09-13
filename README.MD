## API muitíssimo simples de contas a pagar/receber (Em desenvolvimento)
Meu objetivo na construção dessa pequena api foram dois:
  1. Treinar meus dedos e mãos
  2. Controlar de forma MUITO objetiva (exatamente do jeito que preciso) a pouca grana que passa pelos meus bolsos :P


## Quero instalar. Como faço?
  1. Clone esse repositório.
  ```
  git clone https://github.com/mbpereira/bills.git
  ```
  
  2. Instale as dependências
  ```
  npm install
  ```

  3. Ajuste o arquivo .env com as informações do seu banco de dados. Você pode se basear no arquivo .env.example

  4. Crie as tabelas no seu banco de dados
  ```
  npm run create-tables
  ```

  5. Inicie a API
  ```
  npm start
  ```

## Legal, mas como executo os testes?
  1. Preencha o arquivo .env com as informações do banco de dados que será usado para fazer testes de integração. Você pode se basear no arquivo .env.example

  2. Execute os testes
  ```
  npm test
  ```
