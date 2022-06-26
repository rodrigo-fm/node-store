import { CreateProductArgs, ICreateProductUseCase } from "../../2-domain/usecases/ICreateProductUseCase";
import { IProductRepository } from "../dependencies/IProductRepository";

export class CreateProductUseCase implements ICreateProductUseCase {

    constructor(
        private readonly repository: IProductRepository,
    ) {}

    async handle(product: CreateProductArgs): Promise<void> {
        await this.repository.storeProduct({...product});
    }
}