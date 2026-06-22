import TitleCalculator from "./TitleCalculator"
import PlayerTitleCalculator from "./PlayerTitleCalculator"
import { Legacy, TITLE_FOR_PLACE_TWO_PLAYERS, TITLE_FOR_PLACE } from "@/Model"

export { type default as TitleCalculatorInterface } from "./TitleCalculatorInterface"

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
