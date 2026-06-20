import { type ValidatorInterface, ValidationError } from "."

export default class Validator implements ValidatorInterface {
  constructor(private readonly validators: ValidatorInterface[]) {}

  public validate(value: any): ValidationError[] {
    const errors: ValidationError[] = []
    for (const validator of this.validators) {
      errors.push(...(validator.validate(value) ?? []))
    }

    return errors
  }
}
