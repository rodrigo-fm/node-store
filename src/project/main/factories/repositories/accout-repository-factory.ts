import { IAccountRepository } from "../../../3-data/dependencies/IAccountRepository";
import AccountMySQLRepository from "../../../4-infra/mysql/repositories/AccountMySQLRepository";
import DatabaseInfoSingleton from "../../singletons/database-info-singleton";

export const makeAccountRepository = (): IAccountRepository => {
    return new AccountMySQLRepository(DatabaseInfoSingleton.getInstance().datasource);
}