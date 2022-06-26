import { tryCatchHelper } from "../helpers";
import { http201Success, http400BadRequest, IHttpResponse } from '../../../shared/helpers/HttpResponses';
import { IValidator } from '../../../shared/validators';
import { IAddAccountUseCase } from "../../2-domain/usecases";
import IController from "./IController";
import IHttpRequest from "../interfaces/IRequest";

export interface SignUpRequest extends IHttpRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    userProfileId: number;
}

export default class SignUpController implements IController {
    constructor(
        private readonly emailValidator: IValidator,
        private readonly requiredFieldsValidator: IValidator,
        private readonly addAccountUseCase: IAddAccountUseCase
    ) {}

    handle = async (request: SignUpRequest): Promise<IHttpResponse> => {
        return await tryCatchHelper(async (): Promise<IHttpResponse> => {
            this.requiredFieldsValidator.validate(request);

            if(request.password !== request.confirmPassword) {
                return http400BadRequest(`The fields "password" and "confirm password" have different values.`);
            }
            
            this.emailValidator.validate(request.email);
            
            await this.addAccountUseCase.handle({...request});

            return http201Success({
                message: 'New account created succesfully',
            });
        });
    }
}