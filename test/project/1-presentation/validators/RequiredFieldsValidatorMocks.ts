import RequiredFieldsValidator from "../../../../src/project/1-presentation/validators/RequiredFieldsValidator";

type SutType = {
    sut: RequiredFieldsValidator;
};

export const makeSut = (requiredFields: string[]): SutType => {
    return {
        sut: new RequiredFieldsValidator(requiredFields),
    };
}