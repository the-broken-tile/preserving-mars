import { SavedCard, Title } from "."

export default class MissionResult {
  private constructor(
    public readonly points: number = 20,
    public readonly savedCards: SavedCard[] = [],
    public readonly passingOrder: number | null = null,
    public readonly title: Title | null = null,
  ) {}

  public static create(points: number): MissionResult {
    return new MissionResult(points)
  }

  public setPoints(points: number): MissionResult {
    return new MissionResult(
      points,
      this.savedCards,
      this.passingOrder,
      this.title,
    )
  }

  public addTitle(title: Title | null): MissionResult {
    return new MissionResult(
      this.points,
      this.savedCards,
      this.passingOrder,
      title,
    )
  }

  public setPassingOrder(passingOrder: number | null): MissionResult {
    return new MissionResult(
      this.points,
      this.savedCards,
      passingOrder,
      this.title,
    )
  }
}
