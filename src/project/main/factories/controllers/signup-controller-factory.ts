import { DataSource } from "typeorm";
import IController from "../../../1-presentation/controllers/IController";
import SignUpController from "../../../1-presentation/controllers/SignUpController";
import EmailValidatorAdapter from "../../../1-presentation/validators/EmailValidatorAdapter";
import { AddAccountUseCase } from "../../../3-data/usecases/AddAccountUseCase";
import BCryptAdapter from "../../../4-infra/encrypter/BCryptAdapter";
import AccountMySQLRepository from "../../../4-infra/mysql/repositories/AccountMySQLRepository";

export const makeSignUpController = (datasource: DataSource): IController => {
    return new SignUpController(
        new EmailValidatorAdapter(),
        new AddAccountUseCase(
            new AccountMySQLRepository(datasource),
            new BCryptAdapter(12),
        ),
    );
}