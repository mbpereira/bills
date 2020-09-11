import { Application, Request, Response, NextFunction, Router } from "express";
import Knex from "knex";
import { BillService } from "./bill.service";
import { createBillServiceWithKnex } from "./factories";
import { parseException } from "../error/parse-exception";

class BillController {
  /**
   *
   */
  constructor(private billService: BillService) { }

  async load(req: Request, res: Response, next: NextFunction) {
    try {
      const allRecords = await this.billService.getAll();
      res.send(allRecords);
    } catch (e) {
      parseException(e);
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const foundRecord = await this.billService.find(id);

      res.send(foundRecord);
    } catch (e) {
      parseException(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const body = req.body;

      await this.billService.update(id, body);
    } catch (e) {
      parseException(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this.billService.create(req.body);
    } catch (e) {
      parseException(e);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const idBill = Number(req.params.id);
      const idAccount = Number(req.params.account);

      await this.billService.delete(idBill, idAccount);
    } catch (e) {
      parseException(e);
    }
  }

  async pay(req: Request, res: Response, next: NextFunction) {
    try {
      const billId = Number(req.params.id);
      const paymentValue = Number(req.body.value);

      await this.billService.pay(billId, paymentValue);
      next();
    } catch (e) {
      next(parseException(e));
    }
  }
}

export const map = (app: Application, knex: Knex) => {
  const route = Router();
  const launchService = createBillServiceWithKnex(knex);
  const controller = new BillController(launchService);

  route
    .get('/', controller.load)
    .get('/:id', controller.find)
    .put('/:id', controller.update)
    .post('/', controller.create)
    .post('/pay/:id')
    .delete('/:id/estornar/:account', controller.destroy)

  app.use('/contas', route);
}

