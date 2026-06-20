import { v4 } from "uuid"
import { Writeable } from "@/types"
import { Color, Corporation, Development } from "."
export default class Player {
  public readonly id: string = v4()
  private constructor(
    public readonly index: number,
    public readonly name: string,
    public readonly color: Color,
    public readonly corporation: Corporation,
    public readonly developments: Development[],
  ) {}

  public static create(index: number, color: Color): Player {
    return new Player(index, "", color, Corporation.create(), [])
  }

  public setName(name: string): Player {
    const p: Writeable<Player> = new Player(
      this.index,
      name,
      this.color,
      this.corporation,
      this.developments,
    )
    p.id = this.id

    return p
  }

  public setCorporation(corporation: Corporation): Player {
    const p: Writeable<Player> = new Player(
      this.index,
      this.name,
      this.color,
      corporation,
      this.developments,
    )
    p.id = this.id

    return p
  }

  public setColor(color: Color): Player {
    const p: Writeable<Player> = new Player(
      this.index,
      this.name,
      color,
      this.corporation,
      this.developments,
    )
    p.id = this.id

    return p
  }
}
