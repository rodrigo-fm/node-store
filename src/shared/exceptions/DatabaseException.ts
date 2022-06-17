export default class DatabaseException extends Error {    

    name: string;

    constructor(message: string) {
        super();
        this.name = 'DatabaseException';
        this.message = message;
    }
}