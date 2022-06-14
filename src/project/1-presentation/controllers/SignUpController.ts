import { tryCatchHelper } from "../helpers";
import { http201Success, http400BadRequest, http500ServerError, IHttpResponse } from '../../../shared/helpers/HttpResponses';
import { IEmailValidator } from '../../../shared/validators';
import { IAddAccountUseCase } from "../../2-domain/usecases";

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default class SignUpController {
    constructor(
        private readonly validator: IEmailValidator,
        private readonly addAccountUseCase: IAddAccountUseCase
    ) {}

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

            const success = await this.addAccountUseCase.handle({...request});

            if(!success) {
                return http500ServerError('Error creating account');
            }

            return http201Success({
                message: 'New account created succesfully',
            });
        });
    }
}