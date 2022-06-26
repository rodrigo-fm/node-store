import CreateProductController from "../../../1-presentation/controllers/CreateProductController";
import IController from "../../../1-presentation/controllers/IController";
import { makeCreateProductUseCase } from "../usecases/create-product-usecase-factory";
import { makeRequiredFieldsValidator } from "../validators/required-fields-validator-factory";

export const makeCreateProductController = (): IController => {
    const requiredFields: string[] = ['name', 'price', 'description', 'brand', 'quantity', 'sellerId', 'categoryId'];
    return new CreateProductController(
        makeRequiredFieldsValidator(requiredFields),
        makeCreateProductUseCase(),
    );
}