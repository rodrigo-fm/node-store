import { tryCatchHelper } from "../helpers";
import { http200Success, IHttpResponse } from '../../../shared/helpers/HttpResponses';
import { ISearchProductsUseCase } from "../../2-domain/usecases";
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
            
            return http200Success({
                products: result
            });
        });
    }
}