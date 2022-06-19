import ProductEntity from "../../2-domain/entities/ProductEntity";
import { ISearchProductsUseCase, SearchProductsArgs } from "../../2-domain/usecases";
import { IProductRepository } from "../dependencies/IProductRepository";

export default class SearchProductsUseCase implements ISearchProductsUseCase {

    constructor(
        private readonly repository: IProductRepository,
    ) {}

    async handle(account: SearchProductsArgs): Promise<ProductEntity[]> {
        return await this.repository.getProducts({...account});
    }

}