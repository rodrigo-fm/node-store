export default interface IEncrypterCompare {
    compare(value: string, hashedValue: string): Promise<boolean>;
}