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
      errors.push(new ValidationError(t("Name is missing"), value.id, "name"))
    }

    if (value.corporation.name === "") {
      errors.push(
        new ValidationError(
          t("Corporation is missing"),
          value.id,
          "corporation",
        ),
      )
    }

    return errors
  }
}
