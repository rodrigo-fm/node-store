import IController from "../../../1-presentation/controllers/IController";
import SearchProductsController from "../../../1-presentation/controllers/SearchProductsController";
import { makeSearchProductsUseCase } from "../usecases/search-products-usecase-factory";

export const makeSearchProductsController = (): IController => {
    return new SearchProductsController(
        makeSearchProductsUseCase()
    );
}