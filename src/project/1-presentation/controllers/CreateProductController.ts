import { tryCatchHelper } from "../helpers";
import { http201Success, IHttpResponse } from '../../../shared/helpers/HttpResponses';
import { IValidator } from '../../../shared/validators';
import IController from "./IController";
import IHttpRequest from "../interfaces/IRequest";
import { ICreateProductUseCase } from "../../2-domain/usecases/ICreateProductUseCase";

export interface CreateProductRequest extends IHttpRequest {
    name: string;
    price: number;
    description: string;
    brand: string;
    quantity: number;
    sellerId: number;
    categoryId: number;
}

export default class CreateProductController implements IController {
    
    constructor(
        private readonly requiredFieldsValidator: IValidator,
        private readonly createProductUseCase: ICreateProductUseCase,
    ) {}

    handle = async (request: CreateProductRequest): Promise<IHttpResponse> => {
        return await tryCatchHelper(async (): Promise<IHttpResponse> => {
            this.requiredFieldsValidator.validate(request);
            
            await this.createProductUseCase.handle({...request});

            return http201Success({
                message: 'product created succesfully'
            });
        });
    }
}