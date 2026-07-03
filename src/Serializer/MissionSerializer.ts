import { SerializerInterface, SerializedSavedCard } from "."
import { MissionResult, SavedCard } from "@/Model"
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
    return {
      p: value.points,
      t: this.serializer.serialize(value.title),
      m: value.mission,
      s: value.savedCards.map(
        (c: SavedCard): SerializedSavedCard => this.serializer.serialize(c),
        this,
      ),
      o: value.passingOrder,
      _t: "m",
    }
  }

  public setSerializer(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
