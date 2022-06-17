import SignUpController from "../../../../src/project/1-presentation/controllers/SignUpController";
import IHttpRequest from "../../../../src/project/1-presentation/interfaces/IRequest";
import { AddAccountArgs, IAddAccountUseCase } from "../../../../src/project/2-domain/usecases";
import { IValidator } from "../../../../src/shared/validators";

type SutType = {
    sut: SignUpController;
    emailValidator: IValidator;
    requiredFieldsValidator: IValidator;
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

export const makeEmailValidatorSut = (): IValidator => {
    class EmailValidatorSut implements IValidator {
        validate = (email: string): void => {
            return;
        }
    }
    return new EmailValidatorSut();
}

export const makeRequiredFieldsSut = (): IValidator => {
    const requiredFields: string[] = [];

    class RequiredFieldsValidator implements IValidator {

        constructor(
            private readonly requiredFields: string[]
        ) {}

        validate = (request: IHttpRequest): void => {
            return;
        }
    }
    return new RequiredFieldsValidator(requiredFields);
}

export const makeSut = (): SutType => {
    const emailValidator = makeEmailValidatorSut();
    const requiredFieldsValidator = makeRequiredFieldsSut();
    const usecase = makeUseCaseSut();

    return {
        sut: new SignUpController(emailValidator, requiredFieldsValidator, usecase),
        emailValidator: emailValidator,
        requiredFieldsValidator: requiredFieldsValidator,
        usecase: usecase,
    };
}