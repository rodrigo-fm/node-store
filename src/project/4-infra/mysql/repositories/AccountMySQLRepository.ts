import { DataSource } from "typeorm";
import { IAccountRepository, IAddAccountRepository, IFindByEmailRepository } from "../../../3-data/dependencies/IAccountRepository";

export default class AccountMySQLRepository implements IAccountRepository {

    constructor(
        private readonly datasource: DataSource,
    ) {}

    async create(account: IAddAccountRepository.Args): Promise<boolean> {
        await this.datasource.query(`
            INSERT INTO user (email, name, password, user_profile_id)
            VALUES ('${account.email}', '${account.name}', '${account.password}', ${account.userProfileId});
        `);

        return true;
    }
    
    async findByEmail(email: string): Promise<IFindByEmailRepository.Return | null> {
        const user = await this.datasource.query(`
            SELECT * FROM user
            WHERE email = '${email}';
        `);

        if(user.length === 0) {
            return null;
        }

        return user[0];
    }
}