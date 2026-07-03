import IdentityInterface from "@/Model/IdentityInterface"

export type SavedCardType = "project" | "innovation" | "development"

export default class SavedCard implements IdentityInterface<SavedCard> {
  private static nextId: number = 1
  private readonly id: string
  constructor(
    public readonly name: string,
    public readonly type: SavedCardType = "project",
  ) {
    this.id = SavedCard.id
  }

  public is(other: SavedCard): boolean {
    return this.id === other.id
  }

  private static get id(): string {
    try {
      return String(SavedCard.nextId)
    } finally {
      SavedCard.nextId++
    }
  }
}
