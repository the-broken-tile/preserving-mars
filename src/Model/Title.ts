export type TitleName = "Governor" | "Administrator" | "Prefect"

export const POINTS_PER_TITLE: Record<TitleName, number> = {
  Governor: 15,
  Administrator: 10,
  Prefect: 5,
}

export const TITLE_FOR_PLACE: Record<number, TitleName> = {
  1: "Governor",
  2: "Administrator",
  3: "Prefect",
}

export const TITLE_FOR_PLACE_TWO_PLAYERS: Record<number, TitleName> = {
  1: "Governor",
  2: "Prefect",
}

export default class Title {
  constructor(
    public readonly name: TitleName,
    public readonly mission: number,
    public readonly points: number,
  ) {}
}
