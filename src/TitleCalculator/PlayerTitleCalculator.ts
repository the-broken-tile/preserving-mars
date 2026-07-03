import { Legacy, MissionResult, Player, Title, TitleName } from "@/Model"
import { TitleCalculatorInterface } from "."

export default class PlayerTitleCalculator implements TitleCalculatorInterface {
  constructor(
    private readonly titleForPlace: Record<number, TitleName>,
    private readonly pointsPerTitle: Record<TitleName, number>,
    private readonly megaCreditsForPlace: Record<number, number>,
    public readonly supports: (legacy: Legacy) => boolean,
  ) {}

  public updateTitles(legacy: Legacy): Legacy {
    // have to update all players' missionResults
    const players: Player[] = legacy.getSortedPlayers()

    let l: Legacy = legacy

    players.forEach((player: Player, index: number): void => {
      const place: number = index + 1
      let result: MissionResult = player.currentMissionResult
      const titleName: TitleName = this.titleForPlace[place]

      result = result.setTitle(
        new Title(
          titleName,
          legacy.currentMission,
          this.pointsPerTitle[titleName],
          this.megaCreditsForPlace[place]!,
        ),
      )
      l = l.setMissionResult(player, result)
    })

    return l
  }
}
