import IController from "../../../1-presentation/controllers/IController";
import SignUpController from "../../../1-presentation/controllers/SignUpController";
import { makeEmailValidator } from "../adapters";
import { makeAddAccountUseCase } from "../usecases";
import { makeRequiredFieldsValidator } from "../validators/required-fields-validator-factory";

export const makeSignUpController = (): IController => {
    const requiredFields: string[] = ['name', 'email', 'password', 'confirmPassword', 'userProfileId'];
    return new SignUpController(
        makeEmailValidator(),
        makeRequiredFieldsValidator(requiredFields),
        makeAddAccountUseCase(),
    );
}