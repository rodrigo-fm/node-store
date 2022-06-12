import { tryCatchHelper } from "../helpers";
import { http201Success, http400BadRequest, IHttpResponse } from '../../../shared/helpers/HttpResponses';

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default class SignUpController {
    handle = async (request: SignUpRequest): Promise<IHttpResponse> => {
        return await tryCatchHelper(async () => {
            if(request.password !== request.confirmPassword) {
                return http400BadRequest({
                    message: `The fields "password" and "confirm password" have different values!`,
                });
            }
            return http201Success({
                message: 'New account created succesfully',
            });
        });
    }
}