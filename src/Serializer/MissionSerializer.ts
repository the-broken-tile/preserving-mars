import { SerializerInterface } from "."
import { MissionResult } from "@/Model"
import { SerializedMission } from "./types"

export default class MissionSerializer implements SerializerInterface<
  MissionResult,
  SerializedMission
> {
  private serializer!: SerializerInterface<any, any>

  public supports(value: any): value is MissionResult {
    return value instanceof MissionResult
  }
  public serialize(value: MissionResult): SerializedMission {
    return [
      "m",
      value.points,
      this.serializer.serialize(value.title),
      value.mission,
      this.serializer.serialize(value.savedCards),
      value.passingOrder,
    ]
  }

  public setSerializer(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
