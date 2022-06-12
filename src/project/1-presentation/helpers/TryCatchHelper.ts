import { DatabaseException } from "../../../shared/exceptions";

export default function(callable: () => Promise<any>): Promise<any> {
    try {
        return callable();
    } catch(error) {
        if(error instanceof DatabaseException) {
            return Promise.resolve(error.message);
        }
        return Promise.resolve('Unknown error');
    }
}