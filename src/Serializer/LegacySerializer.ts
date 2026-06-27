import { SerializerInterface, SerializedPlayer, SerializedMission } from "."
import { Legacy, MissionResult, MissionResults, Phase, Player } from "@/Model"

export type SerializedMissionResults = Record<string, SerializedMission>[]

export type SerializedLegacy = {
  id: string
  currentMission: number
  totalMissions: number
  phase: Phase
  name: string | null
  players: SerializedPlayer[]
  missionResults: SerializedMissionResults
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
      currentMission: value.currentMission,
      totalMissions: value.totalMissions,
      phase: value.phase,
      name: value["_name"],
      players: value.players.map(
        (player: Player): SerializedPlayer => this.serializer.serialize(player),
        this,
      ),
      missionResults: this.serializeMissionResults(value.missionResults),
      _type: "legacy",
    }
  }

  public setSerializer(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }

  private serializeMissionResults(
    map: MissionResults,
  ): Record<string, SerializedMission>[] {
    const result: Record<string, SerializedMission>[] = []
    map.forEach(
      (missionResults: Map<Player, MissionResult>, mission: number): void => {
        result[mission] = {} satisfies Record<string, SerializedMission>
        missionResults.forEach(
          (missionResult: MissionResult, player: Player): void => {
            result[mission][player.id] =
              this.serializer.serialize(missionResult)
          },
        )
      },
    )
    return result
  }
}
