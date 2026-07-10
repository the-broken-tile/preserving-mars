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

  public initMissionResults(missions: number): Player {
    const missionResults: MissionResult[] = []
    for (let mission: number = 0; mission < missions; mission++) {
      missionResults[mission] = MissionResult.create(mission)
    }

    return this.clone({
      missionResults,
    })
  }

  public is(other: Player): boolean {
    return this.id === other.id
  }

  public setMissionResult(missionResult: MissionResult): Player {
    return this.clone({
      missionResults: this.missionResults.map(
        (m: MissionResult): MissionResult =>
          m.mission === missionResult.mission ? missionResult : m,
      ),
    })
  }

  public getPreviousMissionResult(
    currentMission: number,
  ): MissionResult | undefined {
    return this.missionResults[currentMission - 1]
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

  private clone(props: Record<string, any> = {}): Player {
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
