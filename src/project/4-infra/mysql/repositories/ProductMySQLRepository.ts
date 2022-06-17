import { DataSource } from "typeorm";
import { DatabaseException } from "../../../../shared/exceptions";
import ProductEntity from "../../../2-domain/entities/ProductEntity";
import { IGetProductsRepository, IProductRepository } from "../../../3-data/dependencies/IProductRepository";

export default class ProductMySQLRepository implements IProductRepository {

    constructor(
        private readonly datasource: DataSource,
    ) {}

    async getProducts(account: IGetProductsRepository.Args): Promise<IGetProductsRepository.Return> {
        // TODO: implement filters
        return await this.datasource.query(`
            SELECT * FROM product
        `);
    }

    async showProduct(id: number): Promise<ProductEntity> {

        const result = await this.datasource.query(`
            SELECT * FROM product
            WHERE id = ${id}
        `);

        if(result.length === 0) {
            throw new DatabaseException('Error finding the product');
        }

        return result[0];
    }
}