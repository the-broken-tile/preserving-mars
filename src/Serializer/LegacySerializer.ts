import { SerializerInterface, SerializedPlayer, SerializedLegacy } from "."
import { Legacy, Player } from "@/Model"

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
      i: value.id,
      c: value.currentMission,
      t: value.totalMissions,
      f: value.phase,
      n: value["_name"],
      p: value.players.map(
        (player: Player): SerializedPlayer => this.serializer.serialize(player),
        this,
      ),
      _t: "l",
    }
  }

  public setSerializer(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
