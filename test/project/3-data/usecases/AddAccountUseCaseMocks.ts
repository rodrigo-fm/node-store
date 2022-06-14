import { IAccountRepository, IAddAccountRepository, IFindByEmailRepository } from "../../../../src/project/3-data/dependencies/IAccountRepository";
import IEncrypter from "../../../../src/project/3-data/dependencies/IEncrypter";
import { AddAccountUseCase } from "../../../../src/project/3-data/usecases/AddAccountUseCase";

type SutType = {
    sut: AddAccountUseCase;
    repository: IAccountRepository;
    encrypter: IEncrypter;
};

export const makeRepositorySut = (): IAccountRepository => {
    class AccountRepository implements IAccountRepository {
        create(account: IAddAccountRepository.Args): Promise<boolean> {
            return Promise.resolve(true);
        }

        findByEmail(email: string): Promise<IFindByEmailRepository.Return | null> {
            return Promise.resolve({
                email: 'email@email.com',
                name: 'username',
                password: 'password',
            });
        }
    }

    return new AccountRepository();
}

export const makeEncrypterSut = (): IEncrypter => {
    class Encrypter implements IEncrypter {
        encrypt(value: string): Promise<string> {
            return Promise.resolve('hashed_password');
        }
    }

    return new Encrypter();
}

export const makeSut = (): SutType => {
    const repository = makeRepositorySut();
    const encrypter = makeEncrypterSut();

    return {
        sut: new AddAccountUseCase(repository, encrypter),
        repository,
        encrypter,
    };
}