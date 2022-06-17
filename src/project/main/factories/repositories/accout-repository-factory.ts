import { IAccountRepository } from "../../../3-data/dependencies/IAccountRepository";
import AccountMySQLRepository from "../../../4-infra/mysql/repositories/AccountMySQLRepository";
import DatabaseInfo from "../../config/database/database-info";

export const makeAccountRepository = (): IAccountRepository => {
    return new AccountMySQLRepository(DatabaseInfo.getInstance().datasource);
}