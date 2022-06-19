import { SignInRequest } from "../../../../src/project/1-presentation/controllers/SignInController";
import { InvalidParamException, MissingParamException } from "../../../../src/shared/exceptions";
import { http201Success, http400BadRequest, http500ServerError } from "../../../../src/shared/helpers/HttpResponses";
import { makeSut } from "./SignInControllerMocks";

describe('SignInController', () => {

    const validRequest: SignInRequest = {
        email: 'email',
        password: 'password',
    };

    test('Should return 400 and an error message if an invalid email is provided', async () => {
        // arrange
        const { sut, emailValidator } = makeSut();
        jest.spyOn(emailValidator, 'validate').mockImplementationOnce(() => {
            throw new InvalidParamException('Wrong email or password');
        });

        // act
        const result = await sut.handle({ ...validRequest });

        // assert
        expect(result).toEqual(http400BadRequest('Wrong email or password'))
    });

    test('Should return 400 and an error message if a field is missing from the request', async () => {
        // arrange
        const { sut, requiredFieldsValidator } = makeSut();
        jest.spyOn(requiredFieldsValidator, 'validate').mockImplementationOnce(() => {
            throw new MissingParamException('The field email is required')
        });

        // act
        const result = await sut.handle({ ...validRequest });

        // assert
        expect(result).toEqual(http400BadRequest('The field email is required'))
    });

    test('Should return 500 and an error message if a server error occurs', async () => {
        // arrange
        const { sut, usecase } = makeSut();
        jest.spyOn(usecase, 'handle').mockImplementationOnce(() => {
            throw new Error('Server error');
        });

        // act
        const result = await sut.handle({ ...validRequest });

        // assert
        expect(result).toEqual(http500ServerError('Server error'));
    });

    test('Should return 201 and a user entity when a valid request body is received', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.handle({ ...validRequest });

        // assert
        expect(result).toEqual(http201Success({
            id: 1,
            email: 'email@email.com',
            name: 'username',
            userProfileId: 1,
            token: {
                value: 'eiajdisajiodjoiajiowjiewioojia',
                expiryDate: new Date(),
            }
        }));
    });
});