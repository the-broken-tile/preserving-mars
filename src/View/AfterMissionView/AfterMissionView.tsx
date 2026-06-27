import { Fragment, JSX } from "react"
import { Legacy, Player } from "@/Model"
import { legacyRepository } from "@/Repository"
import { useLegacyContext } from "@/Context/LegacyContext"
import { PlayerNameView, SavedCardsView, TitleView } from "@/View"
import { t } from "@/i18n"
import { MISSION_COUNT } from "@/constants"

export default function AfterMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()

  const handleNexMissionClick: VoidFunction = (): void => {
    const l: Legacy = legacy.advance()
    setLegacy(l)
    legacyRepository.save(l)
  }

  return (
    <div>
      {legacy.players.map(
        (player: Player, i: number): JSX.Element => (
          <Fragment key={i}>
            <PlayerNameView player={player} />
            <TitleView player={player} />
            <div>
              {t("Title Points: %points%", {
                points: legacy.getTitlePoints(player),
              })}
            </div>
            {i < legacy.players.length - 1 && <hr />}
            <SavedCardsView player={player} />
          </Fragment>
        ),
      )}
      {legacy.currentMission !== MISSION_COUNT ?
        <button
          type="button"
          className="button"
          onClick={handleNexMissionClick}
        >
          {t("Start mission %mission%", {
            mission: t(String(legacy.currentMission + 1), {}, "missionNames"),
          })}
        </button>
      : null}
    </div>
  )
}
