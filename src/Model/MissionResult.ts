import { SavedCard } from "."

export default class MissionResult {
  private constructor(
    public readonly points: number = 0,
    public readonly savedCards: SavedCard[] = [],
  ) {}

  public static create(points: number = 0): MissionResult {
    return new MissionResult(points)
  }

  public setPoints(points: number): MissionResult {
    return new MissionResult(points, this.savedCards)
  }
}
