import { IMiddleware } from "../../../1-presentation/interfaces";
import { AuthMiddleware } from "../../../1-presentation/middlewares";
import { makeLoadUserByTokenUseCase } from "../usecases/load-user-by-token-usecase-factory";

export const makeAuthMiddleware = (): IMiddleware => {
    return new AuthMiddleware(
        makeLoadUserByTokenUseCase(),
    );
}