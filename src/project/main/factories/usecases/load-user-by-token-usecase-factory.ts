import ILoadUserByTokenUseCase from "../../../2-domain/usecases/ILoadUserByToken"
import LoadUserByTokenUseCase from "../../../3-data/usecases/LoadUserByTokenUseCase"
import { makeTokenGeneratorAdapter } from "../adapters/token-generator-adapter-factory";
import { makeAccountRepository } from "../repositories";

export const makeLoadUserByTokenUseCase = (): ILoadUserByTokenUseCase => {
    return new LoadUserByTokenUseCase(
        makeAccountRepository(),
        makeTokenGeneratorAdapter(),
    );
}