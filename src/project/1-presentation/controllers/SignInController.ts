import { tryCatchHelper } from "../helpers";
import { http201Success, IHttpResponse } from '../../../shared/helpers/HttpResponses';
import { IValidator } from '../../../shared/validators';
import { ISignInUseCase } from "../../2-domain/usecases";
import IController from "./IController";
import IHttpRequest from "../interfaces/IRequest";

export interface SignInRequest extends IHttpRequest {
    email: string;
    password: string;
}

export default class SignInController implements IController {
    constructor(
        private readonly emailValidator: IValidator,
        private readonly requiredFieldsValidator: IValidator,
        private readonly signInUseCase: ISignInUseCase,
    ) {}

    handle = async (request: SignInRequest): Promise<IHttpResponse> => {
        return await tryCatchHelper(async (): Promise<IHttpResponse> => {
            this.requiredFieldsValidator.validate(request);
            this.emailValidator.validate(request.email);
            
            const userData = await this.signInUseCase.handle({...request});

            return http201Success(userData);
        });
    }
}