import { Application, Request, Response, NextFunction, Router } from "express";
import Knex from "knex";
import { createLaunchService } from "./factories";
import { LaunchService } from "./launch.service";

class LaunchController {
    /**
     *
     */
    constructor(private knex: LaunchService) { }
    
    async load(req: Request, res: Response, next: NextFunction) { }
    async find(req: Request, res: Response, next: NextFunction) { }
    async update(req: Request, res: Response, next: NextFunction) { }
    async create(req: Request, res: Response, next: NextFunction) { }
    async destroy(req: Request, res: Response, next: NextFunction) { }
}

export const map = (app: Application, knex: Knex) => {
    const route = Router();
    const launchService = createLaunchService(knex);
    const controller = new LaunchController(launchService);

        route
            .get('/', controller.load)
            .get('/:id', controller.find)
            .put('/:id', controller.update)
            .post('/', controller.create)
            .delete('/:id', controller.destroy)
    
    app.use('/launches', route);
}

