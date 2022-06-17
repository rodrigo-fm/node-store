import IEncrypter from "../../../3-data/dependencies/IEncrypter";
import BCryptAdapter from "../../../4-infra/encrypter/BCryptAdapter";

export const makeBCryptAdapter = (): IEncrypter => {
    const saltRounds: number = 12;
    return new BCryptAdapter(saltRounds);
}