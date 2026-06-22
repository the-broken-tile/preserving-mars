import { JSX } from "react"
import { Legacy, MissionResult, Player } from "@/Model"
import { legacyRepository } from "@/Repository"
import { useLegacyContext } from "@/Context/LegacyContext"
import { PlayerRowView, SavedCardsView, TitleView } from "@/View"
import { t } from "@/i18n"
import { MISSION_COUNT } from "@/constants"

export default function AfterMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()

  const handleResultChange =
    (player: Player) =>
    (result: MissionResult): void => {
      const l: Legacy = legacy.setMissionResult(player, result)
      setLegacy(l)
      legacyRepository.save(l)
    }

  const handleNexMissionClick: VoidFunction = (): void => {
    const l: Legacy = legacy.advance()
    setLegacy(l)
    legacyRepository.save(l)
  }

  return (
    <div>
      {legacy.players.map(
        (player: Player, i: number): JSX.Element => (
          <PlayerRowView player={player} key={player.id}>
            <SavedCardsView
              result={legacy.getCurrentMission(player)}
              onChange={handleResultChange(player)}
            />

            <TitleView player={player} />
            <hr className="halfsies" />
            <div>
              {t("Title Points: %points%", {
                points: legacy.getTitlePoints(player),
              })}
            </div>
            {i < legacy.players.length - 1 && <hr />}
          </PlayerRowView>
        ),
      )}
      {legacy.mission !== MISSION_COUNT ?
        <button
          type="button"
          className="button"
          onClick={handleNexMissionClick}
        >
          {t("Start mission %mission%", {
            mission: t(String(legacy.mission + 1), {}, "missionNames"),
          })}
        </button>
      : null}
    </div>
  )
}
