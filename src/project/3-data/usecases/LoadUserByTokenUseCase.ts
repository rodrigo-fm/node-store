import { InvalidParamException } from "../../../shared/exceptions";
import { UserEntity } from "../../2-domain/entities";
import ILoadUserByTokenUseCase from "../../2-domain/usecases/ILoadUserByToken";
import { IAccountRepository } from "../dependencies/IAccountRepository";
import ITokenGenerator from "../dependencies/ITokenGenerator";

export default class LoadUserByTokenUseCase implements ILoadUserByTokenUseCase {

    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly tokenGenerator: ITokenGenerator,
    ) {}

    handle = async (token: string): Promise<UserEntity> => {
        // get user info from token with tokenGenerator
        const tokenUser = await this.tokenGenerator.decrypt(token);

        if(tokenUser === null) throw new InvalidParamException('Invalid token provided');

        // check if email exists on the database
        const validUser = await this.accountRepository.findByEmail(tokenUser.email);

        if(validUser === null) {
            throw new Error('Valid user not found');
        }

        tokenUser.exp = tokenUser.exp.toString();
        while(tokenUser.exp.length < 13) tokenUser.exp += "0";

        return {
            ...tokenUser,
            userProfileId: tokenUser.user_profile_id,
            token: {
                expiryDate: new Date(parseInt(tokenUser.exp))
            }
        };
    }
}