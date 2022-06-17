import { IValidator } from "../../../../shared/validators";
import EmailValidatorAdapter from "../../../1-presentation/validators/EmailValidatorAdapter";

export const makeEmailValidator = (): IValidator => {
    return new EmailValidatorAdapter();
}