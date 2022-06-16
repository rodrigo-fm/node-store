import express, { Express } from 'express';
import { DataSource } from 'typeorm';
import setUpRoutes from './routes';

export const setUpApp = async (datasource: DataSource): Promise<Express> => {
    const app = express();
    setUpRoutes(app, datasource);

    return app;
}