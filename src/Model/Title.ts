export type TitleName = "g" | "a" | "p" | "n"

export default class Title {
  constructor(
    public readonly name: TitleName,
    public readonly mission: number,
    public readonly points: number,
    public readonly startingMegaCredits: number,
  ) {}

  public static none(mission: number): Title {
    return new Title("n", mission, 0, 0)
  }
}
