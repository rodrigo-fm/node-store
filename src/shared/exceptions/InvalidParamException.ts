export default class InvalidParamException extends Error {
    name: string;

    constructor(message: string) {
        super();
        this.name = 'InvalidParamException';
        this.message = message;
    }
}