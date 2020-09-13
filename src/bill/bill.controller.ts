import { Application, Request, Response, NextFunction, Router } from "express";
import Knex from "knex";
import { BillService } from "./bill.service";
import { createBillServiceWithKnex } from "./factories";
import { parseException } from "../error/parse-exception";

const billController = (billService: BillService) => ({

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allRecords = await billService.getAll();
      res.send(allRecords);
    } catch (e) {
      parseException(e);
    }
  },

  findById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const foundRecord = await billService.find(id);

      res.send(foundRecord);
    } catch (e) {
      next(parseException(e));
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;

      await billService.update(id, body);
    } catch (e) {
      next(parseException(e));
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await billService.create(req.body);
    } catch (e) {
      next(parseException(e));
    }
  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idBill = Number(req.params.id);
      const idAccount = Number(req.params.account);

      await billService.delete(idBill, idAccount);
    } catch (e) {
      next(parseException(e));
    }
  },

  pay: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const billId = Number(req.params.id);
      const paymentValue = Number(req.body.value);

      await billService.pay(billId, paymentValue);
      next();
    } catch (e) {
      next(next(parseException(e)));
    }
  }
});

export const map = (app: Application, knex: Knex) => {
  const route = Router();
  const controller = billController(createBillServiceWithKnex(knex));

  route
    .get('/', controller.getAll)
    .get('/:id', controller.findById)
    .put('/:id', controller.update)
    .post('/', controller.create)
    .post('/pay/:id', controller.pay)
    .delete('/:id/estornar/:account', controller.destroy)

  app.use('/contas', route);
}

