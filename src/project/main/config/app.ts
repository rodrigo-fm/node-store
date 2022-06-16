import express, { Express } from 'express';
import { DataSource } from 'typeorm';
import setUpRoutes from './routes';

export const setUpApp = async (datasource: DataSource): Promise<Express> => {
    const app = express();
    app.use(express.json());
    setUpRoutes(app, datasource);

    return app;
}