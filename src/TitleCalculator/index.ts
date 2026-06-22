import TitleCalculator from "./TitleCalculator"
export { type default as TitleCalculatorInterface } from "./TitleCalculatorInterface"
import PlayerTitleCalculator from "./PlayerTitleCalculator"
import { Legacy, TITLE_FOR_PLACE_TWO_PLAYERS, TITLE_FOR_PLACE } from "@/Model"

export const titleCalculator: TitleCalculator = new TitleCalculator([
  new PlayerTitleCalculator(
    TITLE_FOR_PLACE_TWO_PLAYERS,
    (legacy: Legacy): boolean => legacy.players.length === 2,
  ),
  new PlayerTitleCalculator(
    TITLE_FOR_PLACE,
    (legacy: Legacy): boolean => legacy.players.length > 2,
  ),
])
