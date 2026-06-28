export type TitleName = "Governor" | "Administrator" | "Prefect" | "none"

export default class Title {
  constructor(
    public readonly name: TitleName,
    public readonly mission: number,
    public readonly points: number,
    public readonly startingMegaCredits: number,
  ) {}

  public static none(mission: number): Title {
    return new Title("none", mission, 0, 0)
  }
}
