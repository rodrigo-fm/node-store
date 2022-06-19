import { DatabaseException, InvalidParamException } from "../../../shared/exceptions";
import { UserEntity } from "../../2-domain/entities";
import { ISignInUseCase, SignInArgs } from "../../2-domain/usecases";
import { IAccountRepository } from "../dependencies/IAccountRepository";
import IEncrypterCompare from "../dependencies/IEncrypterCompare";

export class SignInUseCase implements ISignInUseCase {

    constructor(
        private readonly repository: IAccountRepository,
        private readonly encrypterCompare: IEncrypterCompare,
    ) {}

    handle = async (credentials: SignInArgs): Promise<UserEntity> => {
        // check if email exists
        const existingAccount = await this.repository.findByEmail(credentials.email);

        if(existingAccount === null) {
            throw new InvalidParamException('Wrong email or password');
        }

        if(!this.encrypterCompare.compare(credentials.password, existingAccount.password)) {
            throw new InvalidParamException('Wrong email or password');
        }

        // TODO: generate token

        // return the proper user entity
        
        return {
            ...existingAccount,
            token: {
                value: 'sahdhsahidhwiahiudwahudawhdwa',
                expiryDate: new Date(),
            }
        };
    }
}