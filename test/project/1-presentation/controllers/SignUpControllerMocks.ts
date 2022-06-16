import SignUpController from "../../../../src/project/1-presentation/controllers/SignUpController";
import { AddAccountArgs, IAddAccountUseCase } from "../../../../src/project/2-domain/usecases";
import { IEmailValidator } from "../../../../src/shared/validators";

type SutType = {
    sut: SignUpController;
    validator: IEmailValidator;
    usecase: IAddAccountUseCase;
};

export const makeUseCaseSut = (): IAddAccountUseCase => {
    class AddAccountUseCaseSut implements IAddAccountUseCase {
        handle(account: AddAccountArgs): Promise<boolean> {
            return Promise.resolve(true);
        }
    }

    return new AddAccountUseCaseSut();
}

export const makeValidatorSut = (): IEmailValidator => {
    class EmailValidatorSut implements IEmailValidator {
        isValid = (email: string): boolean => true;
    }
    return new EmailValidatorSut();
}

export const makeSut = (): SutType => {
    const validator = makeValidatorSut();
    const usecase = makeUseCaseSut();

    return {
        sut: new SignUpController(validator, usecase),
        validator: validator,
        usecase: usecase,
    };
}