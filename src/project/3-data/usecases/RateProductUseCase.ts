import { IRateProductUseCase, RateProductArgs } from "../../2-domain/usecases/IRateProductUseCase";
import { IProductRepository } from "../dependencies/IProductRepository";

export default class RateProductUseCase implements IRateProductUseCase {

    constructor (
        private readonly productRepository: IProductRepository
    ) {}

    async handle(review: RateProductArgs): Promise<void> {
        await this.productRepository.storeProductReview(review);
    }
}