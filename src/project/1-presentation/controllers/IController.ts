import { IHttpResponse } from "../../../shared/helpers/HttpResponses";
import IHttpRequest from "../interfaces/IRequest";

export default interface IController {
    handle: (request: IHttpRequest) => Promise<IHttpResponse>
}