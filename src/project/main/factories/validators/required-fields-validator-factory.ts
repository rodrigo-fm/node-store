import { IValidator } from "../../../../shared/validators";
import RequiredFieldsValidator from "../../../1-presentation/validators/RequiredFieldsValidator";

export const makeRequiredFieldsValidator = (requiredFields: string[]): IValidator => {
    return new RequiredFieldsValidator(requiredFields);
}