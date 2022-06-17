import ProductEntity from "../../2-domain/entities/ProductEntity";

export namespace IGetProductsRepository {
    export type Args = {
        name: string;
        email: string;
        password: string;
        userProfileId: number;
    };

    export type Return = ProductEntity[];
}

export namespace IShowProductRepository {
    export type Return = ProductEntity;
}

export interface IProductRepository {
    getProducts(account: IGetProductsRepository.Args): Promise<IGetProductsRepository.Return>;
    showProduct(id: number): Promise<IShowProductRepository.Return>;
}