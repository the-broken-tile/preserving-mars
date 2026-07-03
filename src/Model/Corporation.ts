import { Writeable } from "@/types"
import { v4 } from "uuid"
import IdentityInterface from "@/Model/IdentityInterface"

export default class Corporation implements IdentityInterface<Corporation> {
  public readonly id: string
  private constructor(public readonly name: string) {
    this.id = Corporation.id
  }
  public is(other: Corporation): boolean {
    return other.id === this.id
  }

  private static get id(): string {
    return v4()
  }
  public static create(name: string = ""): Corporation {
    return new Corporation(name)
  }

  public setName(name: string): Corporation {
    const c: Writeable<Corporation> = new Corporation(name)
    c.id = this.id

    return c
  }
}
