import { v4 } from "uuid"
import { t } from "@/i18n"
import { MISSION_COUNT } from "@/constants"
import { Writeable } from "@/types"
import { ADVANCEMENT_MAP } from "./Phase"
import { Player, Phase } from "."

export default class Legacy {
  public readonly id: string = v4()
  private constructor(
    private readonly _players: Player[],
    public readonly mission: number = 1,
    public readonly phase: Phase = "preparing",
    private readonly _name: string | null = null,
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

    return t("A legacy for %s", {
      players: this.players.map(p => p.name).join(", "),
    })
  }

  public setName(name: string): Legacy {
    const l: Writeable<Legacy> = new Legacy(
      this._players,
      this.mission,
      this.phase,
      this._name,
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
    )
    l.id = this.id

    return l as Legacy
  }
}
