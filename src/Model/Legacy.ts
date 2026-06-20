import { Player, Phase } from "."
import { v4 } from "uuid"
import { t } from "@/i18n"

export default class Legacy {
  public readonly id: string = v4()
  public readonly mission: number = 1
  public readonly phase: Phase = "preparing"
  private readonly _name: string | null = null
  constructor(private readonly _players: Player[]) {}

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
}
