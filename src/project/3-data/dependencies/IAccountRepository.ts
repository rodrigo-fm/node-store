export namespace IAddAccountRepository {
    export type Args = {
        name: string;
        email: string;
        password: string;
        userProfileId: number;
    };

    export type Return = boolean;
}

export namespace IFindByEmailRepository {
    export type Return = {
        name: string;
        email: string;
    };
}

export interface IAccountRepository {
    create(account: IAddAccountRepository.Args): Promise<IAddAccountRepository.Return>;
    findByEmail(email: string): Promise<IFindByEmailRepository.Return | null>;
}