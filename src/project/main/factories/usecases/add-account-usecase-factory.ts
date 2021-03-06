import { IAddAccountUseCase } from "../../../2-domain/usecases"
import { AddAccountUseCase } from "../../../3-data/usecases/AddAccountUseCase"
import { makeBCryptAdapter } from "../adapters"
import { makeAccountRepository } from "../repositories"

export const makeAddAccountUseCase = (): IAddAccountUseCase => {
    return new AddAccountUseCase(
        makeAccountRepository(),
        makeBCryptAdapter(),
    );
}