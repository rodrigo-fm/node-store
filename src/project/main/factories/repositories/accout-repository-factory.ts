import { DataSource } from "typeorm";
import { IAccountRepository } from "../../../3-data/dependencies/IAccountRepository";
import AccountMySQLRepository from "../../../4-infra/mysql/repositories/AccountMySQLRepository";

export const makeAccountRepository = (datasource: DataSource): IAccountRepository => {
    return new AccountMySQLRepository(datasource);
}