import { tryCatchHelper } from "../helpers";
import { http201Success, http400BadRequest, IHttpResponse } from '../../../shared/helpers/HttpResponses';
import { IValidator } from '../../../shared/validators';
import { IAddAccountUseCase, ISearchProductsUseCase } from "../../2-domain/usecases";
import IController from "./IController";
import IHttpRequest from "../interfaces/IRequest";
import ProductEntity from "../../2-domain/entities/ProductEntity";

export interface SearchProductsRequest extends IHttpRequest {
    name?: string;
    description?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
}

export default class SearchProductsController implements IController {
    constructor(
        private readonly searchProductsUseCase: ISearchProductsUseCase,
    ) {}

    handle = async (request: SearchProductsRequest): Promise<IHttpResponse> => {
        return await tryCatchHelper(async (): Promise<IHttpResponse> => {
            const result: ProductEntity[] = await this.searchProductsUseCase.handle({...request});
            
            return http201Success(result);
        });
    }
}