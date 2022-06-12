import SignUpController from "../../../../src/project/1-presentation/controllers/SignUpController";

type SutType = {
    sut: SignUpController;
};

export const makeSut = (): SutType => {
    return {
        sut: new SignUpController(),
    };
}