import { UserProfileEnum } from "../../../shared/enums";
import { http200Success, http403Forbidden, IHttpResponse } from "../../../shared/helpers/HttpResponses";
import { UserEntity } from "../../2-domain/entities";
import ILoadUserByTokenUseCase from "../../2-domain/usecases/ILoadUserByToken";
import { tryCatchHelper } from "../helpers";
import { IHttpRequest, IMiddleware } from "../interfaces";

export interface SellerMiddlewareArgs extends IHttpRequest {
    authorization?: string
}

export default class SellerMiddleware implements IMiddleware {

    constructor(
        private readonly loadUserByToken: ILoadUserByTokenUseCase,
    ) {}

    handle = async (httpRequest: SellerMiddlewareArgs): Promise<IHttpResponse> => {
        return tryCatchHelper(async () => {
            const { authorization } = httpRequest;
            if(authorization !== undefined) {
                const user: UserEntity = await this.loadUserByToken.handle(authorization);
                console.log("seller middleware: " + JSON.stringify(user));
                if(user.userProfileId === UserProfileEnum.SELLER && user.token !== undefined && user.token.expiryDate > new Date()) {
                    return http200Success({});
                }
            }
            return http403Forbidden(`You don't have permition to access this route`);
        });
    }
}