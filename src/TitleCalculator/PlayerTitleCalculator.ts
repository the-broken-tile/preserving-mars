import { Legacy, MissionResult, Player, Title } from "@/Model"
import { TitleCalculatorInterface } from "."

export default class PlayerTitleCalculator implements TitleCalculatorInterface {
  constructor(
    private readonly titleForPlace: Record<number, Title>,
    public readonly supports: (legacy: Legacy) => boolean,
  ) {}

  public updateTitles(legacy: Legacy): Legacy {
    // have to update all players' missionResults
    const players: Player[] = legacy.getSortedPlayers()

    let l: Legacy = legacy

    players.forEach((player: Player, index: number): void => {
      let result: MissionResult = legacy.getCurrentMission(player)
      const myTitle: Title | null = this.titleForPlace[index + 1] ?? null
      result = result.addTitle(myTitle)
      l = l.setMissionResult(player, result)
    })

    return l
  }
}
