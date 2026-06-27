import { v4 } from "uuid"
import { t } from "@/i18n"
import { MISSION_COUNT, STARTING_TERRAFORMING_RATING } from "@/constants"
import { Writeable } from "@/types"
import { ADVANCEMENT_MAP } from "./Phase"
import { Player, Phase, MissionResult, Title, SavedCard } from "."

export type MissionResults = Map<Player, MissionResult>[]

export default class Legacy {
  private debug: Record<string, any> = {}
  public readonly id: string = v4()
  private constructor(
    private readonly _players: Player[],
    public readonly totalMissions: number,
    public readonly currentMission: number = 0,
    public readonly phase: Phase = "preparing",
    private readonly _name: string | null = null,
    public readonly missionResults: MissionResults = [],
  ) {}

  public static create(players: Player[], missions: number): Legacy {
    return new Legacy([...players], missions)
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
      this.totalMissions,
      this.currentMission,
      this.phase,
      name,
      [...this.missionResults],
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
      this.phase === "afterMission" ?
        this.currentMission + 1
      : this.currentMission
    if (mission > MISSION_COUNT) {
      newPhase = "finished"
    }

    const l: Writeable<Legacy> = new Legacy(
      this._players,
      this.totalMissions,
      mission,
      newPhase,
      this._name,
      [...this.missionResults],
    )
    l.id = this.id

    return l as Legacy
  }

  public getCurrentPlayerMissions(): Map<Player, MissionResult> {
    let results: Map<Player, MissionResult> | undefined =
      this.missionResults[this.currentMission]

    if (results !== undefined) {
      return results
    }

    results = new Map<Player, MissionResult>()
    for (const player of this.players) {
      results.set(player, MissionResult.create(STARTING_TERRAFORMING_RATING))
    }
    this.missionResults[this.currentMission] = results

    return results
  }

  public getCurrentMission(player: Player): MissionResult {
    return this.getCurrentPlayerMissions().get(player)!
  }

  public getSavedCards(player: Player): SavedCard[] {
    const cards: SavedCard[] = []
    this.getMissionResultsForPlayer(player).forEach(
      (missionResult: MissionResult, mission: number): void => {
        for (const card of missionResult.savedCards) {
          if (card.type === "innovation") {
            // Always display innovation cards.
            cards.push(card)

            continue
          }

          if (
            this.phase === "afterMission" &&
            mission === this.currentMission
          ) {
            // return only currently saved cards
            cards.push(card)

            return
          }

          if (
            "beforeMission" === this.phase &&
            mission === this.currentMission - 1
          ) {
            // Return only project cards that were saved last mission.
            cards.push(card)
          }
        }
      },
    )

    return cards
  }

  public removeSavedCard(card: SavedCard): Legacy {
    const missionResults: MissionResults = []
    for (const missionResultMap of this.missionResults) {
      const missionResultsPerPlayer: Map<Player, MissionResult> = new Map<
        Player,
        MissionResult
      >()
      for (const [player, missionResult] of missionResultMap) {
        // No need for existence check
        missionResultsPerPlayer.set(player, missionResult.removeSavedCard(card))
      }
      missionResults.push(missionResultsPerPlayer)
    }

    const l: Writeable<Legacy> = new Legacy(
      this._players,
      this.currentMission,
      this.currentMission,
      this.phase,
      this._name,
      [...missionResults],
    )
    l.id = this.id

    return l as Legacy
  }

  public setMissionResult(
    player: Player,
    missionResult: MissionResult,
  ): Legacy {
    const missionResults: MissionResults = this.missionResults
    missionResults[this.currentMission]!.set(player, missionResult)

    const l: Writeable<Legacy> = new Legacy(
      this._players,
      this.totalMissions,
      this.currentMission,
      this.phase,
      this._name,
      [...missionResults],
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

  public getTitles(player: Player): Title[] {
    const titles: Title[] = []

    const missionResults: MissionResult[] =
      this.getMissionResultsForPlayer(player)
    for (const result of missionResults) {
      if (result.title === null) {
        continue
      }

      titles.push(result.title)
    }

    return titles
  }

  public getTitlePoints(player: Player): number {
    let points: number = 0

    const missionResults: MissionResult[] =
      this.getMissionResultsForPlayer(player)
    for (const result of missionResults) {
      points += result.title?.points ?? 0
    }

    return points
  }

  private getMissionResultsForPlayer(player: Player): MissionResult[] {
    return this.missionResults.map(
      (missionResultMap: Map<Player, MissionResult>): MissionResult =>
        missionResultMap.get(player)!,
    )
  }

  private log(player: Player, missionResults: MissionResult[]): void {
    if (this.debug[player.id]) {
      return
    }
    this.debug[player.id] = missionResults
    console.log(player.name, this.debug[player.id])
  }
}
