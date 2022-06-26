import { Request, Response, NextFunction } from 'express';
import { IHttpRequest, IMiddleware } from "../../1-presentation/interfaces";

type ExpressFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const adaptMiddleware = (middleware: IMiddleware): ExpressFunction => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const request: IHttpRequest = {
            ...(req.headers || {})
        };

        const response = await middleware.handle(request);

        if(response.statusCode === 200) {
            next();
        } else {
            res.status(response.statusCode).json(response.body);
        }
    }
}