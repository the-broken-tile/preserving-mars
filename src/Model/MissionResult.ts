import { SavedCard, Title } from "."
import { STARTING_TERRAFORMING_RATING } from "@/constants"

export default class MissionResult {
  private constructor(
    public readonly points: number,
    public readonly title: Title,
    public readonly mission: number,
    public readonly savedCards: SavedCard[] = [],
    public readonly passingOrder: number | null = null,
  ) {}

  public static create(mission: number): MissionResult {
    return new MissionResult(
      STARTING_TERRAFORMING_RATING,
      Title.none(mission),
      mission,
    )
  }

  public setPoints(points: number): MissionResult {
    return new MissionResult(
      points,
      this.title,
      this.mission,
      this.savedCards,
      this.passingOrder,
    )
  }

  public setTitle(title: Title): MissionResult {
    return new MissionResult(
      this.points,
      title,
      this.mission,
      this.savedCards,
      this.passingOrder,
    )
  }

  public setPassingOrder(passingOrder: number | null): MissionResult {
    return new MissionResult(
      this.points,
      this.title,
      this.mission,
      this.savedCards,
      passingOrder,
    )
  }

  public removeSavedCard(card: SavedCard): MissionResult {
    return new MissionResult(
      this.points,
      this.title,
      this.mission,
      this.savedCards.filter((c: SavedCard): boolean => c.id !== card.id),
      this.passingOrder,
    )
  }

  public addSavedCard(card: SavedCard): MissionResult {
    return new MissionResult(
      this.points,
      this.title,
      this.mission,
      [...this.savedCards, card],
      this.passingOrder,
    )
  }

  public get startingMegaCredits(): number {
    return this.title.startingMegaCredits
  }
}
