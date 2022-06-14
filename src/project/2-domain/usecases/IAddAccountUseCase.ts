export interface AddAccountArgs {
    name: string;
    email: string;
    password: string;
}

export interface IAddAccountUseCase {
    handle(account: AddAccountArgs): Promise<boolean>;
}