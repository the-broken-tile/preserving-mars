import { v4 } from "uuid"
import { Writeable } from "@/types"
import { Color, Corporation } from "."
export default class Player {
  public readonly id: string = v4()
  private constructor(
    public readonly name: string,
    public readonly color: Color,
    public readonly corporation: Corporation,
  ) {}

  public static create(color: Color): Player {
    return new Player("", color, Corporation.create())
  }

  public setName(name: string): Player {
    const p: Writeable<Player> = new Player(name, this.color, this.corporation)
    p.id = this.id

    return p
  }

  public setCorporation(corporation: Corporation): Player {
    const p: Writeable<Player> = new Player(this.name, this.color, corporation)
    p.id = this.id

    return p
  }

  public setColor(color: Color): Player {
    const p: Writeable<Player> = new Player(this.name, color, this.corporation)
    p.id = this.id

    return p
  }
}
