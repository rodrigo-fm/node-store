import SignInController from "../../../../src/project/1-presentation/controllers/SignInController";
import IHttpRequest from "../../../../src/project/1-presentation/interfaces/IRequest";
import { UserEntity } from "../../../../src/project/2-domain/entities";
import { ISignInUseCase, SignInArgs } from "../../../../src/project/2-domain/usecases";
import { IValidator } from "../../../../src/shared/validators";

type SutType = {
    sut: SignInController;
    emailValidator: IValidator;
    requiredFieldsValidator: IValidator;
    usecase: ISignInUseCase;
};

export const makeUseCaseSut = (): ISignInUseCase => {
    class AddAccountUseCaseSut implements ISignInUseCase {
        async handle(credentials: SignInArgs): Promise<UserEntity> {
            return Promise.resolve({
                id: 1,
                email: 'email@email.com',
                name: 'username',
                userProfileId: 1,
                token: {
                    value: 'eiajdisajiodjoiajiowjiewioojia',
                    expiryDate: new Date(),
                }
            });
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
        sut: new SignInController(emailValidator, requiredFieldsValidator, usecase),
        emailValidator: emailValidator,
        requiredFieldsValidator: requiredFieldsValidator,
        usecase: usecase,
    };
}