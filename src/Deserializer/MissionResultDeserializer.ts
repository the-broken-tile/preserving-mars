import { MissionResult } from "@/Model"
import { SerializedMission } from "@/Serializer"
import { Writeable } from "@/types"
import { DeserializerInterface } from "."

export default class MissionResultDeserializer implements DeserializerInterface<
  SerializedMission,
  MissionResult
> {
  private deserializer!: DeserializerInterface<any, any>

  public supports(value: any): value is SerializedMission {
    return Array.isArray(value) && value[0] === "m"
  }

  public deserialize(value: SerializedMission): MissionResult {
    const result: Writeable<MissionResult> = MissionResult.create(value[3])
    result.points = value[1]
    result.title = this.deserializer.deserialize(value[2])
    result.savedCards = this.deserializer.deserialize(value[4])
    result.passingOrder = value[5]

    return result
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
