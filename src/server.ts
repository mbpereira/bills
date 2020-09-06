import express from 'express';
import { map as mapDepositRoutes } from './deposit/deposit.controller';
import { createKnex } from './knex';

const knex = createKnex();
const app = express();

mapDepositRoutes(app, knex);

app.listen(process.env.PORT, () => {
  console.log('Server rodando...');
});
