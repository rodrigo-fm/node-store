import ProductEntity from "../entities/ProductEntity";

export interface SearchProductsArgs {
    name?: string;
    description?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface ISearchProductsUseCase {
    handle(account: SearchProductsArgs): Promise<ProductEntity[]>;
}