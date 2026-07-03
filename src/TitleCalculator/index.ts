import TitleCalculator from "./TitleCalculator"
import PlayerTitleCalculator from "./PlayerTitleCalculator"
import { Legacy, TitleName } from "@/Model"

const TITLE_FOR_PLACE_TWO_PLAYERS: Record<number, TitleName> = {
  1: "g",
  2: "p",
}

const TITLE_FOR_PLACE: Record<number, TitleName> = {
  1: "g",
  2: "a",
  3: "p",
  4: "n",
}

const POINTS_PER_TITLE: Record<TitleName, number> = {
  g: 15,
  a: 10,
  p: 5,
  n: 0,
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
