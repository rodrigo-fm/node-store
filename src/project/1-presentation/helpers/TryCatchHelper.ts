import { http500ServerError } from "../../../shared/helpers/HttpResponses";

export default async function(callable: () => Promise<any>): Promise<any> {
    try {
        return await callable();
    } catch(error) {
        if(error.message !== undefined) {
            return Promise.resolve(http500ServerError(error.message));
        }
        else if(error.constructor !== undefined && error.constructor.name !== undefined) {
            return Promise.resolve(http500ServerError('Unknown server error: ' + error.constructor.name));
        }
        return Promise.resolve(http500ServerError('Unknown server error'));
    }
}