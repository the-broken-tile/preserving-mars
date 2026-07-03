import DeserializerInterface from "./DeserializerInterface"
import { SerializedLegacy, SerializedPlayer } from "@/Serializer"
import { Legacy, Player } from "@/Model"
import { Writeable } from "@/types"

export default class LegacyDeserializer implements DeserializerInterface<
  SerializedLegacy,
  Legacy
> {
  private deserializer!: DeserializerInterface<any, any>

  public supports(value: any): value is SerializedLegacy {
    return value._type === "legacy"
  }

  public deserialize(value: SerializedLegacy): Legacy {
    const players: Player[] = value.players.map(
      (p: SerializedPlayer): Player => this.deserializer.deserialize(p),
    )
    const l: Writeable<Legacy> = Legacy.create(players, value.totalMissions)
    l.id = value.id
    l.currentMission = value.currentMission
    l.phase = value.phase

    if (value.name !== null) {
      return l.setName(value.name)
    }

    return l as Legacy
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
