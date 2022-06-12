import { tryCatchHelper } from "../helpers";
import { http201Success, http400BadRequest, IHttpResponse } from '../../../shared/helpers/HttpResponses';
import { IEmailValidator } from '../../../shared/validators';

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default class SignUpController {

    private readonly validator: IEmailValidator;

    constructor(validator: IEmailValidator) {
        this.validator = validator;
    }

    handle = async (request: SignUpRequest): Promise<IHttpResponse> => {
        return await tryCatchHelper(async (): Promise<IHttpResponse> => {
            if(request.password !== request.confirmPassword) {
                return http400BadRequest({
                    message: `The fields "password" and "confirm password" have different values!`,
                });
            }
            else if(!this.validator.isValid(request.email)) {
                return http400BadRequest({
                    message: 'The email provided is invalid',
                });
            }
            return http201Success({
                message: 'New account created succesfully',
            });
        });
    }
}