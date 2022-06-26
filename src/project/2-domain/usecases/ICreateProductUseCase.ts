export interface CreateProductArgs {
    name: string;
    price: number;
    description: string;
    brand: string;
    quantity: number;
    sellerId: number;
    categoryId: number;
}

export interface ICreateProductUseCase {
    handle(product: CreateProductArgs): Promise<void>;
}