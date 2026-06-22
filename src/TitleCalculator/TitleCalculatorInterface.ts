import { Legacy } from "@/Model"

export default interface TitleCalculatorInterface {
  supports(legacy: Legacy): boolean
  updateTitles(legacy: Legacy): Legacy
}
