import { Legacy, Player } from "@/Model"

export default class LegacyFactory {
  public build(players: Player[], missions: number): Legacy {
    return Legacy.create(
      players.map((p: Player): Player => p.initMissionResults(missions)),
      missions,
    ).advance()
  }
}
