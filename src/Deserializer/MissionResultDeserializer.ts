import DeserializerInterface from "@/Deserializer/DeserializerInterface"
import { SerializedMission } from "@/Serializer"
import { MissionResult } from "@/Model"

export default class MissionResultDeserializer implements DeserializerInterface<
  SerializedMission,
  MissionResult
> {
  public supports(value: any): value is SerializedMission {
    return value._type === "missionResult"
  }
  public deserialize(value: SerializedMission): MissionResult {
    return MissionResult.create(value.points)
  }
}
