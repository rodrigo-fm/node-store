import { IValidator } from '../../../shared/validators';
import validator from 'validator';
import InvalidParamException from '../../../shared/exceptions/InvalidParamException';

export default class EmailValidatorAdapter implements IValidator {
    validate(email: any): void {
        if(!validator.isEmail(email)) {
            throw new InvalidParamException('The email provided is invalid');
        }
        // return validator.isEmail(email);
    }
}