import { IHttpResponse } from "../../../shared/helpers/HttpResponses";
import IHttpRequest from "./IRequest";

export default interface IMIddleware {
    handle(httpRequest: IHttpRequest): Promise<IHttpResponse>
}