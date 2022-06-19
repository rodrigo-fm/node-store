import { ISearchProductsUseCase } from "../../../2-domain/usecases";
import SearchProductsUseCase from "../../../3-data/usecases/SearchProductsUseCase";
import { makeProductsRepository } from "../repositories/products-repository-factory";

export const makeSearchProductsUseCase = (): ISearchProductsUseCase => {
    return new SearchProductsUseCase(
        makeProductsRepository()
    );
}
