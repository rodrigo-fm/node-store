export default interface ITokenGenerator {
    generate(content: any): Promise<string>;
    decrypt(token: string): Promise<any>;
}