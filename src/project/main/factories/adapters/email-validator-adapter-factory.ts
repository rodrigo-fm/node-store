import { IEmailValidator } from "../../../../shared/validators";
import EmailValidatorAdapter from "../../../1-presentation/validators/EmailValidatorAdapter";

export const makeEmailValidator = (): IEmailValidator => {
    return new EmailValidatorAdapter();
}