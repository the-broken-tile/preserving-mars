import { ValidationError, ValidatorInterface } from "."
import { Player } from "@/Model"

export default class PlayerValidator implements ValidatorInterface {
  public validate(value: any): ValidationError[] {
    if (!(value instanceof Player)) {
      return []
    }

    const errors: ValidationError[] = []

    if (value.name === "") {
      errors.push(new ValidationError(`Player "${value.id}" name is missing.`))
    }

    if (value.corporation.name === "") {
      errors.push(
        new ValidationError(`Player "${value.id}" corporation is missing.`),
      )
    }

    return errors
  }
}
