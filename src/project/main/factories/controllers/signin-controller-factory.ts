import IController from "../../../1-presentation/controllers/IController";
import SignInController from "../../../1-presentation/controllers/SignInController";
import { makeEmailValidator } from "../adapters";
import { makeSignInUseCase } from "../usecases/signin-usecase-factory";
import { makeRequiredFieldsValidator } from "../validators/required-fields-validator-factory";

export const makeSignInController = (): IController => {
    const requiredFields: string[] = ['email', 'password'];
    return new SignInController(
        makeEmailValidator(),
        makeRequiredFieldsValidator(requiredFields),
        makeSignInUseCase(),
    );
}