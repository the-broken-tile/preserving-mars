import { Player } from "@/Model"
import { SerializedPlayer } from "@/Serializer"
import { Writeable } from "@/types"
import { DeserializerInterface } from "."

export default class PlayerDeserializer implements DeserializerInterface<
  SerializedPlayer,
  Player
> {
  private deserializer!: DeserializerInterface<any, any>
  public supports(value: any): value is SerializedPlayer {
    return Array.isArray(value) && value[0] === "p"
  }

  public deserialize(value: SerializedPlayer): Player {
    let p: Writeable<Player> = Player.create(
      value[2],
      this.deserializer.deserialize(value[4]),
    )

    return p
      .setName(value[1])
      .setCorporation(this.deserializer.deserialize(value[3]))
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
