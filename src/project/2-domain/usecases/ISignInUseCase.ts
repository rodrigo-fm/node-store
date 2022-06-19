import UserEntity from "../entities/UserEntity";

export interface SignInArgs {
    email: string;
    password: string;
}

export interface ISignInUseCase {
    handle(credentials: SignInArgs): Promise<UserEntity>;
}