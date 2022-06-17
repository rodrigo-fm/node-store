import { DataSource } from "typeorm";
import IController from "../../../1-presentation/controllers/IController";
import SignUpController from "../../../1-presentation/controllers/SignUpController";
import { makeEmailValidator } from "../adapters";
import { makeAddAccountUseCase } from "../usecases";

export const makeSignUpController = (datasource: DataSource): IController => {
    return new SignUpController(
        makeEmailValidator(),
        makeAddAccountUseCase(datasource),
    );
}