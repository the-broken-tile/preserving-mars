import { Legacy, MissionResult, Player, Title, TitleName } from "@/Model"
import { TitleCalculatorInterface } from "."

export default class PlayerTitleCalculator implements TitleCalculatorInterface {
  constructor(
    private readonly titleForPlace: Record<number, TitleName>,
    private readonly pointsPerTitle: Record<TitleName, number>,
    public readonly supports: (legacy: Legacy) => boolean,
  ) {}

  public updateTitles(legacy: Legacy): Legacy {
    // have to update all players' missionResults
    const players: Player[] = legacy.getSortedPlayers()

    let l: Legacy = legacy

    players.forEach((player: Player, index: number): void => {
      let result: MissionResult = legacy.getCurrentMission(player)
      const titleName: TitleName | null = this.titleForPlace[index + 1] ?? null
      if (titleName === null) {
        return
      }
      result = result.addTitle(
        new Title(titleName, legacy.mission, this.pointsPerTitle[titleName]),
      )
      l = l.setMissionResult(player, result)
    })

    return l
  }
}
