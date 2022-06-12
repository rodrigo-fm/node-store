import SignUpController from "../../../../src/project/1-presentation/controllers/SignUpController";
import { IEmailValidator } from "../../../../src/shared/validators";

type SutType = {
    sut: SignUpController;
    validator: IEmailValidator;
};

export const makeValidatorSut = (): IEmailValidator => {
    class EmailValidatorSut implements IEmailValidator {
        isValid = (email: string): boolean => true;
    }
    return new EmailValidatorSut();
}

export const makeSut = (): SutType => {
    const validator = makeValidatorSut();
    return {
        sut: new SignUpController(validator),
        validator: validator,
    };
}