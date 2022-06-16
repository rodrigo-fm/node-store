import { DataSource } from "typeorm";
import AccountMySQLRepository from "../../../../../src/project/4-infra/mysql/repositories/AccountMySQLRepository";

type SutType = {
    sut: AccountMySQLRepository;
    datasource: DataSource;
};

export const makeDataSourceSut = (): DataSource => {
    return new DataSource({ type: 'mysql' });
}

export const makeSut = (): SutType => {
    const datasource = makeDataSourceSut();

    return {
        sut: new AccountMySQLRepository(datasource),
        datasource: datasource,
    };
}