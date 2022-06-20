import ITokenGenerator from "../../3-data/dependencies/ITokenGenerator";

import jwt from 'jsonwebtoken';
import { AuthenticationTokenEnum } from "../../../shared/enums";

export default class TokenGeneratorAdapter implements ITokenGenerator {

    constructor(
        private readonly secret: string,
    ) {}

    async generate(content: any): Promise<string> {
        return jwt.sign(content, this.secret, {
            expiresIn: `${AuthenticationTokenEnum.DURATION} days`
        });
    }
}