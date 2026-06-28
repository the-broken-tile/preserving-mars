import TitleCalculator from "./TitleCalculator"
import PlayerTitleCalculator from "./PlayerTitleCalculator"
import { Legacy, TitleName } from "@/Model"

const TITLE_FOR_PLACE_TWO_PLAYERS: Record<number, TitleName> = {
  1: "Governor",
  2: "Prefect",
}

const TITLE_FOR_PLACE: Record<number, TitleName> = {
  1: "Governor",
  2: "Administrator",
  3: "Prefect",
  4: "none",
}

const POINTS_PER_TITLE: Record<TitleName, number> = {
  Governor: 15,
  Administrator: 10,
  Prefect: 5,
  none: 0,
}

const MEGA_CREDITS_FOR_PLACE: Record<number, number> = {
  1: 0,
  2: 5,
  3: 10,
  4: 15,
}

export { type default as TitleCalculatorInterface } from "./TitleCalculatorInterface"

export const titleCalculator: TitleCalculator = new TitleCalculator([
  new PlayerTitleCalculator(
    TITLE_FOR_PLACE_TWO_PLAYERS,
    POINTS_PER_TITLE,
    MEGA_CREDITS_FOR_PLACE,
    (legacy: Legacy): boolean => legacy.players.length === 2,
  ),
  new PlayerTitleCalculator(
    TITLE_FOR_PLACE,
    POINTS_PER_TITLE,
    MEGA_CREDITS_FOR_PLACE,
    (legacy: Legacy): boolean => legacy.players.length > 2,
  ),
])
