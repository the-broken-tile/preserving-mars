import DeserializerInterface from "@/Deserializer/DeserializerInterface"
import { SerializedMission, SerializedSavedCard } from "@/Serializer"
import { MissionResult, SavedCard } from "@/Model"
import { Writeable } from "@/types"

export default class MissionResultDeserializer implements DeserializerInterface<
  SerializedMission,
  MissionResult
> {
  private deserializer!: DeserializerInterface<any, any>

  public supports(value: any): value is SerializedMission {
    return value._type === "missionResult"
  }

  public deserialize(value: SerializedMission): MissionResult {
    const result: Writeable<MissionResult> = MissionResult.create(value.points)
    result.passingOrder = value.passingOrder
    result.title = value.title
    result.savedCards = value.savedCards.map(
      (c: SerializedSavedCard): SavedCard => this.deserializer.deserialize(c),
      this,
    )

    return result
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
