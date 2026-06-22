import { Legacy } from "@/Model"
import { TitleCalculatorInterface } from "."

export default class TitleCalculator implements TitleCalculatorInterface {
  constructor(private readonly calculators: TitleCalculatorInterface[]) {}

  public supports(): boolean {
    return true
  }

  public updateTitles(legacy: Legacy): Legacy {
    for (const calculator of this.calculators) {
      if (calculator.supports(legacy)) {
        return calculator.updateTitles(legacy)
      }
    }

    throw new Error("Unsupported legacy calculator")
  }
}
