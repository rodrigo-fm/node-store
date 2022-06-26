import { IAddAccountUseCase, ISignInUseCase } from "../../../2-domain/usecases"
import IEncrypterCompare from "../../../3-data/dependencies/IEncrypterCompare"
import { SignInUseCase } from "../../../3-data/usecases/SignInUseCase"
import { makeBCryptAdapter } from "../adapters"
import { makeTokenGeneratorAdapter } from "../adapters/token-generator-adapter-factory"
import { makeAccountRepository } from "../repositories"

export const makeSignInUseCase = (): ISignInUseCase => {
    return new SignInUseCase(
        makeAccountRepository(),
        (makeBCryptAdapter() as unknown as IEncrypterCompare),
        makeTokenGeneratorAdapter(),
    );
}