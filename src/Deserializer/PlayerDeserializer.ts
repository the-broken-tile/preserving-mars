import DeserializerInterface from "@/Deserializer/DeserializerInterface"
import { SerializedPlayer } from "@/Serializer"
import { Player } from "@/Model"
import { Writeable } from "@/types"

export default class PlayerDeserializer implements DeserializerInterface<
  SerializedPlayer,
  Player
> {
  private deserializer!: DeserializerInterface<any, any>
  public supports(value: any): value is SerializedPlayer {
    return value._type === "player"
  }

  public deserialize(value: SerializedPlayer): Player {
    let p: Writeable<Player> = Player.create(value.color)
    p.id = value.id

    for (const development of value.developments) {
      p = p.addDevelopment(this.deserializer.deserialize(development))
    }

    return p
      .setCorporation(this.deserializer.deserialize(value.corporation))
      .setName(value.name)
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
