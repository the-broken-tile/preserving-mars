import { SerializerInterface } from "."
import { Player } from "@/Model"
import { SerializedPlayer } from "./types"

export default class PlayerSerializer implements SerializerInterface<
  Player,
  SerializedPlayer
> {
  private serializer!: SerializerInterface<any, any>
  public supports(value: any): value is Player {
    return value instanceof Player
  }
  public serialize(value: Player): SerializedPlayer {
    return {
      _t: "p",
      n: value.name,
      c: value.color,
      o: this.serializer.serialize(value.corporation),
      m: this.serializer.serialize(value.missionResults),
    }
  }
  public setSerializer?(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
