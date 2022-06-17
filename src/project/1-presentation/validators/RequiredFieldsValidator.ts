import { MissingParamException } from "../../../shared/exceptions";
import { IValidator } from "../../../shared/validators";
import IRequest from "../interfaces/IRequest";

export default class RequiredFieldsValidator implements IValidator {

    constructor(
        private readonly requiredFields: string[],
    ) {}

    validate(request: IRequest): void {
        for(let i: number = 0; i < this.requiredFields.length; i++) {
            const field = this.requiredFields[i];
            if(request[field] === undefined) {
                throw new MissingParamException('The field ' + field + ' is required');
            }
        }
    }
}