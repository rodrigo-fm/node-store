import { IProductRepository } from "../../../3-data/dependencies/IProductRepository";
import ProductMySQLRepository from "../../../4-infra/mysql/repositories/ProductMySQLRepository";
import DatabaseInfo from "../../config/database/database-info";

export const makeProductsRepository = (): IProductRepository => {
    return new ProductMySQLRepository(DatabaseInfo.getInstance().datasource);
}