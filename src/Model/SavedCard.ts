import { v4 } from "uuid"

export type SavedCardType = "project" | "innovation" | "development"

export default class SavedCard {
  public readonly id: string = v4()
  constructor(
    public readonly name: string,
    public readonly type: SavedCardType = "project",
  ) {}
}
