import { Writeable } from "@/types"
import { v4 } from "uuid"

export default class Corporation {
  public readonly id: string = v4()
  private constructor(public readonly name: string) {}

  public static create(): Corporation {
    return new Corporation("")
  }

  public setName(name: string): Corporation {
    const c: Writeable<Corporation> = new Corporation(name)
    c.id = this.id

    return c
  }
}
