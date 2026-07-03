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
    return value._t === "m"
  }

  public deserialize(value: SerializedMission): MissionResult {
    const result: Writeable<MissionResult> = MissionResult.create(value.m)
    result.passingOrder = value.o
    result.title = this.deserializer.deserialize(value.t)
    result.savedCards = this.deserializer.deserialize(value.s)

    return result
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
