import express from 'express';
import { map as mapDepositRoutes } from './finnancial-account/finnancial-account.controller';
import { createKnex } from './data/knex';

const knex = createKnex();
const app = express();

mapDepositRoutes(app, knex);

app.listen(process.env.PORT, () => {
  console.log('Server rodando...');
});
