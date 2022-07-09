import ProductEntity from "../../2-domain/entities/ProductEntity";

export namespace IGetProductsRepository {
    export type Args = {
        name?: string;
        description?: string;
        brand?: string;
        minPrice?: number;
        maxPrice?: number;
    };
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

export namespace IStoreProduct {
    export type Args = {
        name: string;
        price: number;
        description: string;
        brand: string;
        quantity: number;
        sellerId: number;
        categoryId: number;
    };
}

export interface IProductRepository {
    getProducts(filters: IGetProductsRepository.Args): Promise<ProductEntity[]>;
    showProduct(id: number): Promise<IShowProductRepository.Return>;
    storeProductReview(review: IStoreProductReview.Args): Promise<void>;
    storeProduct(product: IStoreProduct.Args): Promise<void>;
}