import { ValidationError, ValidatorInterface } from "."
import { Player } from "@/Model"
import { t } from "@/i18n"

export default class PlayerValidator implements ValidatorInterface {
  public validate(value: any): ValidationError[] {
    if (!(value instanceof Player)) {
      return []
    }

    const errors: ValidationError[] = []

    if (value.name === "") {
      errors.push(this.createValidationError(value.index, t("name is missing")))
    }

    if (value.corporation.name === "") {
      errors.push(
        this.createValidationError(value.index, t("corporation is missing")),
      )
    }

    return errors
  }

  private createValidationError(
    index: number,
    message: string,
  ): ValidationError {
    return new ValidationError(`[${index}] ${message}.`)
  }
}
