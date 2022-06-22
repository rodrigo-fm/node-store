import ITokenGenerator from "../../../3-data/dependencies/ITokenGenerator";
import TokenGeneratorAdapter from "../../../4-infra/adapters/TokenGeneratorAdapter";

import 'dotenv/config';

export const makeTokenGeneratorAdapter = (): ITokenGenerator => {
    return new TokenGeneratorAdapter(process.env.jwtSecret);
}