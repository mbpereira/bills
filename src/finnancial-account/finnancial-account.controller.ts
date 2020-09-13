import { Application, Request, Response, NextFunction, Router } from "express";
import Knex from "knex";
import { parseException } from "../error/parse-exception";
import { createFinnancialAccountService } from "./factories";
import { FinnancialAccount } from "./finnancial-account";
import { FinnancialAccountService } from "./finnancial-account.service";

class FinnancialAccountController {
  /**
   *
   */
  constructor(private finnancialAccountService: FinnancialAccountService) { }

  async load(req: Request, res: Response, next: NextFunction) {
    try {
      const finnancialAccounts = await this.finnancialAccountService.getAll();
      res.send(finnancialAccounts);
    } catch (e) {
      next(parseException(e));
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const finnancialAccountFound = await this.finnancialAccountService.find(id);
      res.status(200).send(finnancialAccountFound);
    } catch (e) {
      next(parseException(e));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) { 
    try {
      const id = Number(req.params.id);
      const finnancialAccounUpdated = req.body as FinnancialAccount;
      await this.finnancialAccountService.update(id, finnancialAccounUpdated);
      res.status(200).send();
    } catch (e) {
      next(parseException(e));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) { 
    try {
      const newFinnancialAccount = req.body as FinnancialAccount;
      await this.finnancialAccountService.create(newFinnancialAccount);
      res.status(201).send();
    } catch (e) {

    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) { 
    try {
      const idFinnancialAccountToDestroy = Number(req.params.id);
      await this.finnancialAccountService.delete(idFinnancialAccountToDestroy);
      res.status(200).send();
    } catch (e) {
      next(parseException(e));
    }
  }
}

export const map = (app: Application, knex: Knex) => {
  const route = Router();
  const controller = new FinnancialAccountController(createFinnancialAccountService(knex));

  route
    .get('/', controller.load)
    .get('/:id', controller.find)
    .put('/:id', controller.update)
    .post('/', controller.create)
    .delete('/:id', controller.destroy)

  app.use('/contas-financeiras', route);
}

