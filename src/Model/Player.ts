import { Color, Corporation, MissionResult } from "."
import IdentityInterface from "@/Model/IdentityInterface"

export default class Player implements IdentityInterface<Player> {
  private static nextId: number = 1
  public readonly id: string
  private constructor(
    public readonly name: string,
    public readonly color: Color,
    public readonly corporation: Corporation,
    public readonly missionResults: MissionResult[],
  ) {
    this.id = Player.id
  }

  public static create(
    color: Color,
    missionResults: MissionResult[] = [],
  ): Player {
    return new Player("", color, Corporation.create(), missionResults)
  }

  public is(other: Player): boolean {
    return this.id === other.id
  }

  public setMissionResult(missionResult: MissionResult): Player {
    // assert there's at least 1
    this.getMissionResult(0)

    return this.clone({
      missionResults:
        this.missionResults.length === 1 ?
          [missionResult]
        : [
            this.missionResults.slice(0, this.missionResults.length - 1),
            missionResult,
          ],
    })
  }

  public getMissionResult(mission: number): MissionResult {
    if (this.missionResults[mission] === undefined) {
      this.missionResults[mission] = MissionResult.create(mission)
    }

    return this.missionResults[mission]
  }

  public get currentMissionResult(): MissionResult {
    if (this.missionResults.length === 0) {
      // Create the first and return it.
      return this.getMissionResult(0)
    }

    return this.missionResults[this.missionResults.length - 1]
  }

  public getPreviousMissionResult(): MissionResult | undefined {
    if (this.missionResults.length <= 1) {
      return undefined
    }

    return this.missionResults[this.missionResults.length - 2]
  }

  public setName(name: string): Player {
    return this.clone({ name })
  }

  public setCorporation(corporation: Corporation): Player {
    return this.clone({ corporation })
  }

  public setColor(color: Color): Player {
    return this.clone({ color })
  }

  private static get id(): string {
    try {
      return String(Player.nextId)
    } finally {
      Player.nextId++
    }
  }

  private clone(props: Record<string, any>): Player {
    const p: Player = new Player(
      this.name,
      this.color,
      this.corporation,
      this.missionResults,
    )
    Object.assign(p, { ...props, id: this.id })

    return p
  }
}
