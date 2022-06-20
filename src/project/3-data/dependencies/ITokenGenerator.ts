export default interface ITokenGenerator {
    generate(content: any): Promise<string>;
}