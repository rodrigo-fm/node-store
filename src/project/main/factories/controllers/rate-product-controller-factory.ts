import IController from "../../../1-presentation/controllers/IController";
import RateProductController from "../../../1-presentation/controllers/RateProductController";
import { makeRateProductUseCase } from "../usecases/rate-product-usecase-factory";
import { makeRequiredFieldsValidator } from "../validators/required-fields-validator-factory";

export const makeRateProductController = (): IController => {
    const requiredFields: string[] = ['userId', 'productId', 'score', 'review'];
    return new RateProductController(
        makeRequiredFieldsValidator(requiredFields),
        makeRateProductUseCase(),
    );
}