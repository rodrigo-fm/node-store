import { IEmailValidator } from '../../../shared/validators'
import validator from 'validator';

export default class EmailValidatorAdapter implements IEmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email);
    }
}