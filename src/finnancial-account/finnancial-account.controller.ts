import { parse } from "dotenv/types";
import { Application, Request, Response, NextFunction, Router } from "express";
import Knex from "knex";
import { parseException } from "../error/parse-exception";
import { createFinnancialAccountService } from "./factories";
import { FinnancialAccount } from "./finnancial-account";
import { FinnancialAccountService } from "./finnancial-account.service";


const accountController = (finnancialAccountService: FinnancialAccountService) => ({

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(finnancialAccountService);
      const finnancialAccounts = await finnancialAccountService.getAll();
      res.send(finnancialAccounts);
    } catch (e) {
      next(parseException(e));
    }
  },

  findById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const finnancialAccountFound = await finnancialAccountService.find(id);
      res.status(200).send(finnancialAccountFound);
    } catch (e) {
      next(parseException(e));
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const id = Number(req.params.id);
      const finnancialAccounUpdated = req.body as FinnancialAccount;
      await finnancialAccountService.update(id, finnancialAccounUpdated);
      res.status(200).send();
    } catch (e) {
      next(parseException(e));
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const newFinnancialAccount = req.body as FinnancialAccount;
      await finnancialAccountService.create(newFinnancialAccount);
      res.status(201).send();
    } catch (e) {
      next(parseException(e));
    }
  },

  destroy: async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const idFinnancialAccountToDestroy = Number(req.params.id);
      await finnancialAccountService.delete(idFinnancialAccountToDestroy);
      res.status(200).send();
    } catch (e) {
      next(parseException(e));
    }
  }
})

export const map = (app: Application, knex: Knex) => {
  const route = Router();
  const controller = accountController(createFinnancialAccountService(knex));

  route
    .get('/', controller.getAll)
    .get('/:id', controller.findById)
    .put('/:id', controller.update)
    .post('/', controller.create)
    .delete('/:id', controller.destroy)

  app.use('/contas-financeiras', route);
}

