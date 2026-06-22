import TitleCalculator from "./TitleCalculator"
import PlayerTitleCalculator from "./PlayerTitleCalculator"
import {
  Legacy,
  TITLE_FOR_PLACE_TWO_PLAYERS,
  TITLE_FOR_PLACE,
  POINTS_PER_TITLE,
} from "@/Model"

export { type default as TitleCalculatorInterface } from "./TitleCalculatorInterface"

export const titleCalculator: TitleCalculator = new TitleCalculator([
  new PlayerTitleCalculator(
    TITLE_FOR_PLACE_TWO_PLAYERS,
    POINTS_PER_TITLE,
    (legacy: Legacy): boolean => legacy.players.length === 2,
  ),
  new PlayerTitleCalculator(
    TITLE_FOR_PLACE,
    POINTS_PER_TITLE,
    (legacy: Legacy): boolean => legacy.players.length > 2,
  ),
])
