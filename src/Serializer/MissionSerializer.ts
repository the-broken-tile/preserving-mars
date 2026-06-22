import { SerializerInterface, SerializedSavedCard } from "."
import { MissionResult, SavedCard, Title } from "@/Model"

export type SerializedMission = {
  points: number
  savedCards: SerializedSavedCard[]
  passingOrder: number | null
  title: Title | null
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
      savedCards: value.savedCards.map(
        (c: SavedCard): SerializedSavedCard => this.serializer.serialize(c),
        this,
      ),
      passingOrder: value.passingOrder,
      title: value.title,
      _type: "missionResult",
    }
  }

  public setSerializer(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
