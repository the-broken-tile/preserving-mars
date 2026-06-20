import Validator from "./Validator"
import PlayerValidator from "@/container/Validator/PlayerValidator"

export { default as ValidationError } from "./ValidationError"
export type { default as ValidatorInterface } from "./ValidatorInterface"

const validator = new Validator([new PlayerValidator()])
export { validator, Validator }
