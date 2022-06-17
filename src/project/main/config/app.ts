import express, { Express } from 'express';
import setUpRoutes from './routes';

export const setUpApp = async (): Promise<Express> => {
    const app = express();
    app.use(express.json());
    setUpRoutes(app);

    return app;
}