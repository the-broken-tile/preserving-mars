import { v4 } from "uuid"
import { t } from "@/i18n"
import { MISSION_COUNT } from "@/constants"
import { Writeable } from "@/types"
import { ADVANCEMENT_MAP } from "./Phase"
import { Player, Phase, MissionResult } from "."

export type MissionResults = Map<number, Map<Player, MissionResult>>

export default class Legacy {
  public readonly id: string = v4()
  private constructor(
    private readonly _players: Player[],
    public readonly mission: number = 1,
    public readonly phase: Phase = "preparing",
    private readonly _name: string | null = null,
    public readonly missionResults: MissionResults = new Map(),
  ) {}

  public static create(players: Player[]): Legacy {
    return new Legacy(players)
  }

  public get players(): Player[] {
    return [...this._players]
  }

  public get name(): string {
    if (this._name !== null) {
      return this._name
    }

    return t("A legacy of %players%", {
      players: this.players.map((p: Player): string => p.name).join(", "),
    })
  }

  public setName(name: string): Legacy {
    const l: Writeable<Legacy> = new Legacy(
      this._players,
      this.mission,
      this.phase,
      name,
      this.missionResults,
    )
    l.id = this.id

    return l as Legacy
  }

  /**
   * @todo temp
   */
  public setPhase(phase: Phase): Legacy {
    const l: Writeable<Legacy> = new Legacy(
      this._players,
      this.mission,
      phase,
      this._name,
      this.missionResults,
    )
    l.id = this.id

    return l as Legacy
  }

  public advance(): Legacy {
    if (this.phase === "finished") {
      return this
    }

    let newPhase: Phase = ADVANCEMENT_MAP[this.phase]
    const mission: number =
      newPhase === "beforeMission" ? this.mission : this.mission + 1
    if (mission > MISSION_COUNT) {
      newPhase = "finished"
    }

    const l: Writeable<Legacy> = new Legacy(
      this._players,
      mission,
      newPhase,
      this._name,
      this.missionResults,
    )
    l.id = this.id

    return l as Legacy
  }

  public getCurrentPlayerMissions(): Map<Player, MissionResult> {
    let results: Map<Player, MissionResult> | undefined =
      this.missionResults.get(this.mission)

    if (results !== undefined) {
      return results
    }

    results = new Map<Player, MissionResult>()
    for (const player of this.players) {
      results.set(player, MissionResult.create())
    }
    this.missionResults.set(this.mission, results)

    return results
  }

  public getCurrentMission(player: Player): MissionResult {
    return this.getCurrentPlayerMissions().get(player)!
  }

  public setMissionResult(
    player: Player,
    missionResult: MissionResult,
  ): Legacy {
    const missionResults: MissionResults = this.missionResults
    missionResults.get(this.mission)!.set(player, missionResult)

    const l: Writeable<Legacy> = new Legacy(
      this._players,
      this.mission,
      this.phase,
      this._name,
      missionResults,
    )
    l.id = this.id

    return l as Legacy
  }

  public getSortedPlayers(): Player[] {
    return this.players.sort((a: Player, b: Player): number => {
      const missionA: MissionResult = this.getCurrentMission(a)
      const pointsA: number = missionA.points

      const missionB: MissionResult = this.getCurrentMission(b)
      const pointsB: number = missionB.points

      if (pointsA === pointsB) {
        // @todo have to confirm - whoever passed first is first?
        return missionA.passingOrder! - missionB.passingOrder!
      }

      return pointsB - pointsA
    })
  }

  public hasTies(): boolean {
    const points: number[] = [...this.getCurrentPlayerMissions().values()].map(
      (mission: MissionResult): number => mission.points,
    )
    const set: Set<number> = new Set(points)

    return points.length !== set.size
  }

  public hasToResolveTies(): boolean {
    if (!this.hasTies()) {
      return false
    }

    return [...this.getCurrentPlayerMissions().values()].some(
      (mission: MissionResult): boolean => mission.passingOrder === null,
    )
  }
}
