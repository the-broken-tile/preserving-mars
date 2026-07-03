import { v4 } from "uuid"
import IdentityInterface from "@/Model/IdentityInterface"

export type SavedCardType = "project" | "innovation" | "development"

export default class SavedCard implements IdentityInterface<SavedCard> {
  public readonly id: string
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
    return v4()
  }
}
