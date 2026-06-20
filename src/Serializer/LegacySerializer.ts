import { SerializerInterface, SerializedPlayer } from "."
import { Legacy, Phase, Player } from "@/Model"

export type SerializedLegacy = {
  id: string
  mission: number
  phase: Phase
  name: string | null
  players: SerializedPlayer[]
  _type: "legacy"
}

export default class LegacySerializer implements SerializerInterface<
  Legacy,
  SerializedLegacy
> {
  private serializer!: SerializerInterface<any, any>

  public supports(value: any): value is Legacy {
    return value instanceof Legacy
  }

  public serialize(value: Legacy): SerializedLegacy {
    return {
      id: value.id,
      mission: value.mission,
      phase: value.phase,
      name: value["_name"],
      players: value.players.map(
        (player: Player): SerializedPlayer => this.serializer.serialize(player),
        this,
      ),
      _type: "legacy",
    }
  }

  public setSerializer(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
