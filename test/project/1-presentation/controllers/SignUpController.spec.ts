import { SignUpRequest } from "../../../../src/project/1-presentation/controllers/SignUpController";
import { UserProfileEnum } from "../../../../src/shared/enums/UserProfileEnum";
import { InvalidParamException, MissingParamException } from "../../../../src/shared/exceptions";
import { http201Success, http400BadRequest, http500ServerError } from "../../../../src/shared/helpers/HttpResponses";
import { makeSut } from "./SignUpControllerMocks";

describe('SignUpController', () => {

    const validRequest: SignUpRequest = {
        name: 'name',
        email: 'email',
        password: 'password',
        confirmPassword: 'password',
        userProfileId: UserProfileEnum.CONSUMER,
    };

    test('Should return 400 and an error message if password and confirmPassword fields have different values', async () => {
        // arrange
        const invalidRequest: SignUpRequest = { ...validRequest };
        invalidRequest.confirmPassword = 'wrong password value';

        const { sut } = makeSut();

        // act
        const result = await sut.handle(invalidRequest);

        // assert
        expect(result).toEqual(http400BadRequest(`The fields "password" and "confirm password" have different values.`))
    });

    test('Should return 400 and an error message if an invalid email is provided', async () => {
        // arrange
        const { sut, emailValidator } = makeSut();
        // jest.spyOn(emailValidator, 'validate').mockReturnValueOnce(false);
        jest.spyOn(emailValidator, 'validate').mockImplementationOnce(() => {
            throw new InvalidParamException('The email provided is invalid');
        });

        // act
        const result = await sut.handle({ ...validRequest });

        // assert
        expect(result).toEqual(http400BadRequest('The email provided is invalid'))
    });

    test('Should return 400 and an error message if a field is missing from the request', async () => {
        // arrange
        const { sut, requiredFieldsValidator } = makeSut();
        // jest.spyOn(emailValidator, 'validate').mockReturnValueOnce(false);
        jest.spyOn(requiredFieldsValidator, 'validate').mockImplementationOnce(() => {
            throw new MissingParamException('The field name is required')
        });

        // act
        const result = await sut.handle({ ...validRequest });

        // assert
        expect(result).toEqual(http400BadRequest('The field name is required'))
    });

    test('Should return 500 and an error message if a server error occurs', async () => {
        // arrange
        const { sut, usecase } = makeSut();
        jest.spyOn(usecase, 'handle').mockImplementationOnce(() => {
            throw new Error('Server error');
        });
        // jest.spyOn(validator, 'isValid').mockRejectedValueOnce(new Error());

        // act
        const result = await sut.handle({ ...validRequest });

        // assert
        expect(result).toEqual(http500ServerError('Server error'));
    });

    test('Should return 500 and an error message if the account creation fails', async () => {
        // arrange
        const { sut, usecase } = makeSut();
        jest.spyOn(usecase, 'handle').mockImplementationOnce(() => {
            throw new InvalidParamException('The email provided is already registered on the database');
        });

        // act
        const result = await sut.handle({ ...validRequest });

        // assert
        expect(result).toEqual(http400BadRequest('The email provided is already registered on the database'))
    });

    test('Should return 201 and a success message when a valid request body is received', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.handle({ ...validRequest });

        // assert
        expect(result).toEqual(http201Success({
            message: 'New account created succesfully',
        }));
    });
});