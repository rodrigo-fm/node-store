import { http500ServerError } from "../../../shared/helpers/HttpResponses";

export default async function(callable: () => Promise<any>): Promise<any> {
    try {
        return await callable();
    } catch(error) {
        return Promise.resolve(http500ServerError(error.message));
    }
}