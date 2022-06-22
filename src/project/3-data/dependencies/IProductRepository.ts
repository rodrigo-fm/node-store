import ProductEntity from "../../2-domain/entities/ProductEntity";

export namespace IGetProductsRepository {
    export type Args = {
        name?: string;
        description?: string;
        brand?: string;
        minPrice?: number;
        maxPrice?: number;
    };

    export type Return = ProductEntity[];
}

export namespace IShowProductRepository {
    export type Return = ProductEntity;
}

export namespace IStoreProductReview {
    export type Args = {
        userId: number;
        productId: number;
        score: number;
        review: string;
    };
}

export interface IProductRepository {
    getProducts(account: IGetProductsRepository.Args): Promise<IGetProductsRepository.Return>;
    showProduct(id: number): Promise<IShowProductRepository.Return>;
    storeProductReview(review: IStoreProductReview.Args): Promise<void>;
}