import { tryCatchHelper } from "../helpers";
import { http201Success, http400BadRequest, http500ServerError, IHttpResponse } from '../../../shared/helpers/HttpResponses';
import { IEmailValidator } from '../../../shared/validators';
import { IAddAccountUseCase } from "../../2-domain/usecases";
import IController from "./IController";

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    userProfileId: number;
}

export default class SignUpController implements IController {
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

            const result: boolean | string = await this.addAccountUseCase.handle({...request});

            if(typeof result === 'string') {
                return http500ServerError(result);
            }

            return http201Success({
                message: 'New account created succesfully',
            });
        });
    }
}