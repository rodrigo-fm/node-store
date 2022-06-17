import { IAddAccountUseCase, AddAccountArgs } from "../../2-domain/usecases";
import { IAccountRepository } from "../dependencies/IAccountRepository";
import IEncrypter from "../dependencies/IEncrypter";

export class AddAccountUseCase implements IAddAccountUseCase {

    constructor(
        private readonly repository: IAccountRepository,
        private readonly encrypter: IEncrypter,
    ) {}

    handle = async (account: AddAccountArgs): Promise<boolean | string> => {
        // check if email exists
        const existingAccount = await this.repository.findByEmail(account.email);

        if(existingAccount !== null) {
            return 'An account with that email already exists';
        }

        // hash password
        const hashedPassword = this.encrypter.encrypt(account.password);

        // call repository to store the user
        const succesfulAccountCreation: boolean = await this.repository.create({...account, password: hashedPassword});

        if(!succesfulAccountCreation) {
            return 'Error creating a new account';
        }

        return succesfulAccountCreation;
    }
}