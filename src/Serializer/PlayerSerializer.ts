import { SerializerInterface, SerializedCorporation } from "."
import { Color, Player } from "@/Model"

export type SerializedPlayer = {
  id: string
  name: string
  color: Color
  corporation: SerializedCorporation
  _type: "player"
}
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
      id: value.id,
      name: value.name,
      color: value.color,
      corporation: this.serializer.serialize(value.corporation),
      _type: "player",
    }
  }
  public setSerializer?(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
