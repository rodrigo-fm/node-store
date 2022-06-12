import SignUpController from "../../../../src/project/1-presentation/controllers/SignUpController";
import { IEmailValidator } from "../../../../src/shared/validators";

type SutType = {
    sut: SignUpController;
    validator: IEmailValidator;
};

export const makeValidatorSut = (): IEmailValidator => {
    return new class EmailValidatorSut implements IEmailValidator {
        isValid = (email: string): boolean => true;
    }
}

export const makeSut = (): SutType => {
    const validator = makeValidatorSut();
    return {
        sut: new SignUpController(validator),
        validator: makeValidatorSut(),
    };
}