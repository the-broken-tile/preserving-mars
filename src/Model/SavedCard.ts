import { v4 } from "uuid"

export default class SavedCard {
  public readonly id: string = v4()
  constructor(public readonly name: string) {}
}
