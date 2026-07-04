import { DeserializerInterface, SerializerInterface } from "."
import { MissionResult } from "@/Model"
import { SerializedMission } from "./types"
import { Writeable } from "@/types"

export default class MissionSerializer
  implements SerializerInterface, DeserializerInterface
{
  private key!: string
  private serializer!: SerializerInterface
  private deserializer!: DeserializerInterface

  public alias(alias: string) {
    this.key = alias
  }

  public serialize(value: any): SerializedMission | undefined {
    return value instanceof MissionResult ?
        [
          this.key,
          value.points,
          this.serializer.serialize(value.title),
          value.mission,
          this.serializer.serialize(value.savedCards),
          value.passingOrder,
        ]
      : undefined
  }

  public deserialize(value: SerializedMission): MissionResult | undefined {
    if (!Array.isArray(value) || value[0] !== "m") {
      return undefined
    }
    const result: Writeable<MissionResult> = MissionResult.create(value[3])
    result.points = value[1]
    result.title = this.deserializer.deserialize(value[2])
    result.savedCards = this.deserializer.deserialize(value[4])
    result.passingOrder = value[5]

    return result
  }

  public setSerializer(serializer: SerializerInterface): void {
    this.serializer = serializer
  }

  public setDeserializer(deserializer: DeserializerInterface): void {
    this.deserializer = deserializer
  }
}
