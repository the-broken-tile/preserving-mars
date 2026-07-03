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
    return value._t === "p"
  }

  public deserialize(value: SerializedPlayer): Player {
    let p: Writeable<Player> = Player.create(
      value.c,
      this.deserializer.deserialize(value.m),
    )

    return p
      .setCorporation(this.deserializer.deserialize(value.o))
      .setName(value.n)
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
