import { Corporation } from "."
import { v4 } from "uuid"

export default class Development {
  public readonly id: string = v4()
  constructor(
    public readonly name: string,
    public readonly corporation: Corporation,
  ) {}
}
