import express, { NextFunction, Request, Response } from 'express';
import { map as mapDepositRoutes } from './finnancial-account/finnancial-account.controller';
import { createKnex } from './data/knex';
import { config } from "dotenv";
import { error } from "./middlewares/error";

config();

const knex = createKnex();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mapDepositRoutes(app, knex);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log('Server rodando...');
});
