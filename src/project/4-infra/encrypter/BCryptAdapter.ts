import IEncrypter from "../../3-data/dependencies/IEncrypter";

import bcrypt from 'bcryptjs';

export default class BCryptAdapter implements IEncrypter {

    constructor(
        private readonly saltRounds: number,
    ) {}

    encrypt(value: string): string {
        return bcrypt.hashSync(value, this.saltRounds);
    }

}