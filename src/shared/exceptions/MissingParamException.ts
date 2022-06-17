export default class MissingParamException extends Error {
    name: string;

    constructor(message: string) {
        super();
        this.name = 'MissingParamException';
        this.message = message;
    }
}