export interface AddAccountArgs {
    name: string;
    email: string;
    password: string;
    userProfileId: number;
}

export interface IAddAccountUseCase {
    handle(account: AddAccountArgs): Promise<boolean | string>;
}