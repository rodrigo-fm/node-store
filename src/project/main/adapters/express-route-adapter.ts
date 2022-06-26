import IController from "../../1-presentation/controllers/IController";

import { Request, Response } from 'express';

export const adaptRoute = (controller: IController) => {
    return async (req: Request, res: Response) => {
        const request = {
            ...(req.body || {}),
            ...(req.params || {}),
            ...(req.headers || {}),
        };

        const httpResponse = await controller.handle(request);
        if(httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            });
        }
    }
}