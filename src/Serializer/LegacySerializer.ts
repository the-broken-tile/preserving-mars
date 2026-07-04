import { DeserializerInterface, SerializerInterface, SerializedLegacy } from "."
import { Legacy } from "@/Model"
import { Writeable } from "@/types"

export default class LegacySerializer
  implements SerializerInterface, DeserializerInterface
{
  private key!: string
  private serializer!: SerializerInterface
  private deserializer!: DeserializerInterface

  public alias(alias: string) {
    this.key = alias
  }

  public serialize(value: any): SerializedLegacy | undefined {
    return value instanceof Legacy ?
        [
          this.key,
          value.id,
          value.currentMission,
          value.totalMissions,
          value.phase,
          value["_name"],
          this.serializer.serialize(value.players),
        ]
      : undefined
  }

  public deserialize(value: any): Legacy | undefined {
    if (!Array.isArray(value) || value[0] !== "l") {
      return undefined
    }
    const l: Writeable<Legacy> = Legacy.create(
      this.deserializer.deserialize(value[6]),
      value[3],
    )
    l.id = value[1]
    l.currentMission = value[2]
    l.phase = value[4]

    if (value[5] !== null) {
      return l.setName(value[5])
    }

    return l as Legacy
  }

  public setSerializer(serializer: SerializerInterface): void {
    this.serializer = serializer
  }

  public setDeserializer(deserializer: DeserializerInterface): void {
    this.deserializer = deserializer
  }
}
