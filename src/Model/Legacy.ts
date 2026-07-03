import { v4 } from "uuid"
import { t } from "@/i18n"
import { ADVANCEMENT_MAP, AFTER, BEFORE, FINISHED, PREPARING } from "./Phase"
import { MissionResult, Phase, Player, SavedCard, Title } from "."
import IdentityInterface from "@/Model/IdentityInterface"

export type MissionResults = Map<Player, MissionResult>[]
type PlayerPointTuple = [Player, number]

export default class Legacy implements IdentityInterface<Legacy> {
  public readonly id: string
  private constructor(
    public readonly players: Player[],
    public readonly totalMissions: number,
    public readonly currentMission: number = 0,
    public readonly phase: Phase = PREPARING,
    private readonly _name: string | null = null,
    public readonly missionResults: MissionResults = [],
  ) {
    this.id = Legacy.id
  }

  public is(other: Legacy): boolean {
    return other.id === this.id
  }

  private static get id(): string {
    return v4().split("-")[0]
  }

  public static create(players: Player[], missions: number): Legacy {
    return new Legacy([...players], missions)
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
    return this.clone({ name })
  }

  public advance(): Legacy {
    if (this.phase === FINISHED) {
      return this
    }

    let newPhase: Phase = ADVANCEMENT_MAP[this.phase]
    const mission: number =
      this.phase === AFTER ? this.currentMission + 1 : this.currentMission
    if (mission >= this.totalMissions) {
      newPhase = FINISHED
    }

    return this.clone({
      phase: newPhase,
      mission: Math.min(mission, this.totalMissions),
    })
  }

  public getCurrentPlayerMissions(): Map<Player, MissionResult> {
    const result: Map<Player, MissionResult> = new Map<Player, MissionResult>()
    for (const player of this.players) {
      result.set(player, player.getMissionResult(this.currentMission))
    }

    return result
  }

  public getCurrentMission(player: Player): MissionResult {
    return this.getCurrentPlayerMissions().get(player)!
  }

  public getSavedCards(player: Player): SavedCard[] {
    const cards: SavedCard[] = []
    player.missionResults.forEach(
      (missionResult: MissionResult, mission: number): void => {
        for (const card of missionResult.savedCards) {
          if (["innovation", "development"].includes(card.type)) {
            // Always display innovation and development cards.
            cards.push(card)

            continue
          }

          if (this.phase === AFTER && mission === this.currentMission) {
            // return only currently saved cards
            cards.push(card)

            return
          }

          if (this.phase === BEFORE && mission === this.currentMission - 1) {
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

    return this.clone({ missionResults })
  }

  public setMissionResult(
    player: Player,
    missionResult: MissionResult,
  ): Legacy {
    let p: Player = player.setMissionResult(missionResult)

    return this.clone({
      players: this.players.map((player: Player): Player => {
        return player.is(p) ? p : player
      }),
    })
  }

  public getSortedPlayers(): Player[] {
    return this.players.sort((a: Player, b: Player): number => {
      const missionA: MissionResult = a.currentMissionResult
      const pointsA: number = missionA.points

      const missionB: MissionResult = b.currentMissionResult
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

    for (const result of player.missionResults) {
      if (result.title === null) {
        continue
      }

      titles.push(result.title)
    }

    return titles
  }

  public getTitlePoints(player: Player): number {
    let points: number = 0

    for (const result of player.missionResults) {
      if (result.mission === this.totalMissions - 1) {
        // Do not take into account last mission.
        continue
      }
      points += result.title?.points ?? 0
    }

    return points
  }

  public getFinalStanding(): PlayerPointTuple[] {
    if (this.phase !== FINISHED) {
      throw new Error("No final standing")
    }

    const tuples: PlayerPointTuple[] = this.players.map(
      (player: Player): [Player, number] => {
        const mission: MissionResult = player.currentMissionResult

        return [player, mission.points + this.getTitlePoints(player)]
      },
    )

    return tuples.sort((a: PlayerPointTuple, b: PlayerPointTuple): number => {
      return b[1] - a[1]
    })
  }

  private clone(props: Record<string, any>): Legacy {
    const l: Legacy = new Legacy(
      this.players,
      this.totalMissions,
      this.currentMission,
      this.phase,
      this._name,
    )
    Object.assign(l, { ...props, id: this.id })

    return l
  }
}
