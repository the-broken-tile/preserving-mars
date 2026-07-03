import { SerializerInterface, SerializedLegacy } from "."
import { Legacy } from "@/Model"

export default class LegacySerializer implements SerializerInterface<
  Legacy,
  SerializedLegacy
> {
  private serializer!: SerializerInterface<any, any>

  public supports(value: any): value is Legacy {
    return value instanceof Legacy
  }

  public serialize(value: Legacy): SerializedLegacy {
    return [
      "l",
      value.id,
      value.currentMission,
      value.totalMissions,
      value.phase,
      value["_name"],
      this.serializer.serialize(value.players),
    ]
  }

  public setSerializer(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
