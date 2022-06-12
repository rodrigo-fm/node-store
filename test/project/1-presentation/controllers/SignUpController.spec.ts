import { SignUpRequest } from "../../../../src/project/1-presentation/controllers/SignUpController";
import { http400BadRequest } from "../../../../src/shared/helpers/HttpResponses";
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
});