import { IRateProductUseCase } from "../../../2-domain/usecases/IRateProductUseCase"
import RateProductUseCase from "../../../3-data/usecases/RateProductUseCase"
import { makeProductsRepository } from "../repositories/products-repository-factory";

export const makeRateProductUseCase = (): IRateProductUseCase => {
    return new RateProductUseCase(
        makeProductsRepository()
    );
}