import { v4 } from "uuid"

export type SavedCardType = "project" | "innovation" | "development"

export default class SavedCard {
  public readonly id: string
  constructor(
    public readonly name: string,
    public readonly type: SavedCardType = "project",
  ) {
    this.id = SavedCard.id
  }

  private static get id(): string {
    return v4()
  }
}
