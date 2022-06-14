import { IAddAccountUseCase, AddAccountArgs } from "../../2-domain/usecases";
import { IAccountRepository } from "../dependencies/IAccountRepository";
import IEncrypter from "../dependencies/IEncrypter";

export class AddAccountUseCase implements IAddAccountUseCase {

    constructor(
        private readonly repository: IAccountRepository,
        private readonly encrypter: IEncrypter,
    ) {}

    handle = async (account: AddAccountArgs): Promise<boolean> => {
        // check if email exists
        const existingAccount = await this.repository.findByEmail(account.email);

        if(existingAccount !== null) {
            return false;
        }

        // hash password
        const hashedPassword = await this.encrypter.encrypt(account.password);

        // call repository to store the user
        const succesfulAccountCreation = await this.repository.create({...account, password: hashedPassword});

        return succesfulAccountCreation;
    }
}