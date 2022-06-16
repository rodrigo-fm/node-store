import { DatabaseException } from "../../../shared/exceptions";
import { http500ServerError } from "../../../shared/helpers/HttpResponses";

export default function(callable: () => Promise<any>): Promise<any> {
    try {
        return callable();
    } catch(error) {
        if(error instanceof DatabaseException) {
            return Promise.resolve(http500ServerError(error.message));
        }
        return Promise.resolve(http500ServerError('Unknown server error'));
    }
}