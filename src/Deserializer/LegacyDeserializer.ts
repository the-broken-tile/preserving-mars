import DeserializerInterface from "./DeserializerInterface"
import { SerializedLegacy, SerializedPlayer } from "@/Serializer"
import { Legacy, MissionResult, MissionResults, Player } from "@/Model"
import { Writeable } from "@/types"
import { SerializedMissionResults } from "@/Serializer/LegacySerializer"

export default class LegacyDeserializer implements DeserializerInterface<
  SerializedLegacy,
  Legacy
> {
  private deserializer!: DeserializerInterface<any, any>

  public supports(value: any): value is SerializedLegacy {
    return value._type === "legacy"
  }

  public deserialize(value: SerializedLegacy): Legacy {
    const l: Writeable<Legacy> = Legacy.create(
      value.players.map(
        (p: SerializedPlayer): Player => this.deserializer.deserialize(p),
      ),
      value.missions,
    )
    l.id = value.id
    l.mission = value.mission
    l.phase = value.phase
    l.missionResults = this.deserializeMissionResults(
      value.missionResults ?? [],
      l.players,
    )

    if (value.name !== null) {
      return l.setName(value.name)
    }

    return l as Legacy
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }

  private deserializeMissionResults(
    serializedMissionResults: SerializedMissionResults,
    players: Player[],
  ): MissionResults {
    const missionResults: MissionResults = [] //new Map<number, Map<Player, MissionResult>>()
    for (const [mission, playerMissions] of Object.entries(
      serializedMissionResults,
    )) {
      const result: Map<Player, MissionResult> = new Map()
      for (const [playerId, missionResults] of Object.entries(playerMissions)) {
        const player: Player = players.find(
          (p: Player): boolean => p.id === playerId,
        )!

        result.set(player, this.deserializer.deserialize(missionResults))
      }

      missionResults[Number(mission)] = result
    }

    return missionResults
  }
}
