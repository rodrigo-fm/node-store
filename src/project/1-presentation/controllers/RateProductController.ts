import { tryCatchHelper } from "../helpers";
import { http201Success, IHttpResponse } from '../../../shared/helpers/HttpResponses';
import { IValidator } from '../../../shared/validators';
import IController from "./IController";
import IHttpRequest from "../interfaces/IRequest";
import { IRateProductUseCase } from "../../2-domain/usecases/IRateProductUseCase";
import { InvalidParamException } from "../../../shared/exceptions";

export interface RateProductRequest extends IHttpRequest {
    userId: number;
    productId: number;
    score: number;
    review: string;
}

export default class RateProductController implements IController {
    
    constructor(
        private readonly requiredFieldsValidator: IValidator,
        private readonly rateProduct: IRateProductUseCase,
    ) {}

    handle = async (request: RateProductRequest): Promise<IHttpResponse> => {
        return await tryCatchHelper(async (): Promise<IHttpResponse> => {
            this.requiredFieldsValidator.validate(request);

            if(request.score > 5 || request.score < 0) {
                throw new InvalidParamException('The product score must be a value between 0 and 5 stars!');
            }
            
            await this.rateProduct.handle({...request});

            return http201Success({
                message: 'product review submitted'
            });
        });
    }
}