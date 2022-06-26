import { Router } from "express";
import { adaptMiddleware } from "../adapters/express-middleware-adapter";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeRateProductController } from "../factories/controllers/rate-product-controller-factory";
import { makeSearchProductsController } from "../factories/controllers/search-products-controller-factory";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware-factory";

export default (router: Router): void => {
    router.get('/products', adaptRoute(makeSearchProductsController()));
    router.post('/product/review', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeRateProductController()));
}