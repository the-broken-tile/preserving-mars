import { ValidationError } from "."

export default interface ValidatorInterface {
  validate(value: any): ValidationError[]
}
