import { IProductRepository } from "../../../3-data/dependencies/IProductRepository";
import ProductMySQLRepository from "../../../4-infra/mysql/repositories/ProductMySQLRepository";
import DatabaseInfoSingleton from "../../singletons/database-info-singleton";

export const makeProductsRepository = (): IProductRepository => {
    return new ProductMySQLRepository(DatabaseInfoSingleton.getInstance().datasource);
}