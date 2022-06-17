import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeSearchProductsController } from "../factories/controllers/search-products-controller-factory";

export default (router: Router): void => {
    router.get('/products', adaptRoute(makeSearchProductsController()));
}