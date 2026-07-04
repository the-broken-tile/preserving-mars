import { DeserializerInterface, SerializerInterface } from "."
import { Player } from "@/Model"
import { SerializedPlayer } from "./types"
import { Writeable } from "@/types"

export default class PlayerSerializer
  implements SerializerInterface, DeserializerInterface
{
  private key!: string
  private serializer!: SerializerInterface
  private deserializer!: DeserializerInterface

  public serialize(value: any): SerializedPlayer | undefined {
    return value instanceof Player ?
        [
          this.key,
          value.name,
          value.color,
          this.serializer.serialize(value.corporation),
          this.serializer.serialize(value.missionResults),
        ]
      : undefined
  }

  public deserialize(value: any): Player | undefined {
    if (!Array.isArray(value) || value[0] !== this.key) {
      return undefined
    }

    let p: Writeable<Player> = Player.create(
      value[2],
      this.deserializer.deserialize(value[4]),
    )

    return p
      .setName(value[1])
      .setCorporation(this.deserializer.deserialize(value[3]))
  }

  public alias(alias: string) {
    this.key = alias
  }

  public setSerializer?(serializer: SerializerInterface): void {
    this.serializer = serializer
  }

  public setDeserializer(deserializer: DeserializerInterface): void {
    this.deserializer = deserializer
  }
}
