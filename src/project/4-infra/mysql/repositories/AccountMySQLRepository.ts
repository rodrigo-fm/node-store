import { IAccountRepository, IAddAccountRepository, IFindByEmailRepository } from "../../../3-data/dependencies/IAccountRepository";

export default class AccountMySQLRepository implements IAccountRepository {

    constructor() {}

    create(account: IAddAccountRepository.Args): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    findByEmail(email: string): Promise<IFindByEmailRepository.Return> {
        throw new Error("Method not implemented.");
    }
}