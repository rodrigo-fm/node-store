import { DataSource } from "typeorm";
import { DatabaseException } from "../../../../shared/exceptions";
import ProductEntity from "../../../2-domain/entities/ProductEntity";
import { IGetProductsRepository, IProductRepository, IStoreProductReview } from "../../../3-data/dependencies/IProductRepository";

export default class ProductMySQLRepository implements IProductRepository {

    constructor(
        private readonly datasource: DataSource,
    ) {}

    async getProducts(account: IGetProductsRepository.Args): Promise<IGetProductsRepository.Return> {
        const result: any[] = await this.datasource.query(`
            SELECT * FROM product
        `);
        
        return result.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                quantity: product.quantity
            };
        });
    }

    async showProduct(id: number): Promise<ProductEntity> {

        const result = await this.datasource.query(`
            SELECT * FROM product
            WHERE id = ${id}
        `);

        if(result.length === 0) {
            throw new DatabaseException('Error finding the product');
        }

        const product = result[0];

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity
        };
    }

    async storeProductReview(review: IStoreProductReview.Args): Promise<void> {
        await this.datasource.query(`
            INSERT INTO user_reviews_product(user_id, product_id, score, review)
            VALUES(${review.userId}, ${review.productId}, ${review.score}, '${review.review}');
        `);
    }
}