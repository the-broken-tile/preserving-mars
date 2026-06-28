import { SerializerInterface, SerializedSavedCard } from "."
import { MissionResult, SavedCard } from "@/Model"
import { SerializedTitle } from "@/Serializer/TitleSerializer"

export type SerializedMission = {
  points: number
  title: SerializedTitle
  mission: number
  savedCards: SerializedSavedCard[]
  passingOrder: number | null
  _type: "missionResult"
}
export default class MissionSerializer implements SerializerInterface<
  MissionResult,
  SerializedMission
> {
  private serializer!: SerializerInterface<any, any>

  public supports(value: any): value is MissionResult {
    return value instanceof MissionResult
  }
  public serialize(value: MissionResult): SerializedMission {
    return {
      points: value.points,
      title: this.serializer.serialize(value.title),
      mission: value.mission,
      savedCards: value.savedCards.map(
        (c: SavedCard): SerializedSavedCard => this.serializer.serialize(c),
        this,
      ),
      passingOrder: value.passingOrder,
      _type: "missionResult",
    }
  }

  public setSerializer(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
