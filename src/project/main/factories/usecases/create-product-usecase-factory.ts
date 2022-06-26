import { ICreateProductUseCase } from "../../../2-domain/usecases/ICreateProductUseCase"
import { CreateProductUseCase } from "../../../3-data/usecases/CreateProductUseCase"
import { makeProductsRepository } from "../repositories/products-repository-factory"

export const makeCreateProductUseCase = (): ICreateProductUseCase => {
    return new CreateProductUseCase(
        makeProductsRepository(),
    );
}