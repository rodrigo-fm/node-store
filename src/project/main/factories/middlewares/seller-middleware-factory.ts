import { IMiddleware } from "../../../1-presentation/interfaces";
import SellerMiddleware from "../../../1-presentation/middlewares/SellerMiddleware";
import { makeLoadUserByTokenUseCase } from "../usecases/load-user-by-token-usecase-factory";

export const makeSellerMiddleware = (): IMiddleware => {
    return new SellerMiddleware(
        makeLoadUserByTokenUseCase(),
    );
}