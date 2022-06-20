import IEncrypter from "../../3-data/dependencies/IEncrypter";

import bcrypt from 'bcryptjs';
import IEncrypterCompare from "../../3-data/dependencies/IEncrypterCompare";

export default class BCryptAdapter implements IEncrypter, IEncrypterCompare {

    constructor(
        private readonly saltRounds: number,
    ) {}

    encrypt(value: string): string {
        return bcrypt.hashSync(value, this.saltRounds);
    }

    async compare(value: string, hashedValue: string): Promise<boolean> {
        return await bcrypt.compare(value, hashedValue);
    }

}