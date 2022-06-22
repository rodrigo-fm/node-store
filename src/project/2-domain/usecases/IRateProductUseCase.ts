export interface RateProductArgs {
    userId: number;
    productId: number;
    score: number;
    review: string;
}

export interface IRateProductUseCase {
    handle(review: RateProductArgs): Promise<void>;
}