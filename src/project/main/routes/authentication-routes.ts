import { Router } from 'express';
import { DataSource } from 'typeorm';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeSignUpController } from '../factories/controllers/signup-controller-factory';

export default (router: Router, datasource: DataSource): void => {
    router.post('/signup', adaptRoute(makeSignUpController(datasource)));
}