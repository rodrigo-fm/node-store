import { SignUpRequest } from "../../../../src/project/1-presentation/controllers/SignUpController";
import { http201Success, http400BadRequest } from "../../../../src/shared/helpers/HttpResponses";
import { makeSut } from "./SignUpControllerMocks";

describe('SignUpController', () => {

    const validRequest: SignUpRequest = {
        name: 'name',
        email: 'email',
        password: 'password',
        confirmPassword: 'password',
    };

    test('Should return 400 and an error message if password and confirmPassword fields have different values', async () => {
        // arrange
        const invalidRequest: SignUpRequest = { ...validRequest };
        invalidRequest.confirmPassword = 'wrong password value';

        const { sut } = makeSut();

        // act
        const result = await sut.handle(invalidRequest);

        // assert
        expect(result).toEqual(http400BadRequest({
            message: `The fields "password" and "confirm password" have different values!`,
        }))
    });

    test('Should return 400 and an error message if an invalid email is provided', async () => {
        // arrange
        const { sut, validator } = makeSut();
        jest.spyOn(validator, 'isValid').mockImplementationOnce((_) => false);

        // act
        const result = await sut.handle({ ...validRequest });

        // assert
        expect(result).toEqual(http400BadRequest({
            message: 'The email provided is invalid',
        }))
    });

    // test('Should return 500 and an error message if the email validator throws', async () => {
    //     // arrange
    //     const { sut, validator } = makeSut();
    //     jest.spyOn(validator, 'isValid').mockImplementationOnce(await Promise.reject(new Error()));

    //     // act
    //     const result = await sut.handle({ ...validRequest });

    //     // assert
    //     expect(result).toEqual(http400BadRequest({
    //         message: `The fields "password" and "confirm password" have different values!`,
    //     }))
    // });

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