import { AuthenticationTokenEnum } from "../../../shared/enums";
import { InvalidParamException } from "../../../shared/exceptions";
import { UserEntity } from "../../2-domain/entities";
import { ISignInUseCase, SignInArgs } from "../../2-domain/usecases";
import { IAccountRepository } from "../dependencies/IAccountRepository";
import IEncrypterCompare from "../dependencies/IEncrypterCompare";
import ITokenGenerator from "../dependencies/ITokenGenerator";

export class SignInUseCase implements ISignInUseCase {

    constructor(
        private readonly repository: IAccountRepository,
        private readonly encrypterCompare: IEncrypterCompare,
        private readonly tokenGenerator: ITokenGenerator,
    ) {}

    handle = async (credentials: SignInArgs): Promise<UserEntity> => {
        const existingAccount = await this.repository.findByEmail(credentials.email);

        if(existingAccount === null) {
            throw new InvalidParamException('Wrong email or password');
        }

        const correctPassword: boolean = await this.encrypterCompare.compare(credentials.password, existingAccount.password);

        if(!correctPassword) {
            throw new InvalidParamException('Wrong email or password');
        }

        existingAccount.password = undefined;
        const authenticationToken: string = await this.tokenGenerator.generate({
            ...existingAccount,
        });

        const expiryDate: Date = new Date();
        expiryDate.setDate(expiryDate.getDate() + AuthenticationTokenEnum.DURATION);

        return {
            ...existingAccount,
            token: {
                value: authenticationToken,
                expiryDate: expiryDate,
            }
        };
    }
}