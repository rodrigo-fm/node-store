import IHttpRequest from "../../../../src/project/1-presentation/interfaces/IRequest";
import { MissingParamException } from "../../../../src/shared/exceptions";
import { makeSut } from "./RequiredFieldsValidatorMocks";

describe('validate', () => {

    const validRequest: IHttpRequest = {
        name: 'name',
        email: 'email',
    };

    test('Should throw MissingParamError if a required parameter is missing on the request', () => {
        // arrange
        const requiredFields: string[] = ['name', 'email', 'password'];
        const { sut } = makeSut(requiredFields);

        // act
        // const isValid = sut.isValid;

        // assert
        expect(() => sut.validate(validRequest)).toThrow(new MissingParamException('The field password is required'));
    });

    test('Should return no value (undefined) if all required fields are provided', () => {
        // arrange
        const requiredFields: string[] = ['name', 'email'];
        const { sut } = makeSut(requiredFields);

        // act
        const result = sut.validate(validRequest);

        // assert
        expect(result).toBe(undefined);
    });
});