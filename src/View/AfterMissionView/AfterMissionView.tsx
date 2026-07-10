import { FormEvent, JSX } from "react"
import { Legacy, Player } from "@/Model"
import { legacyRepository } from "@/Repository"
import { useLegacyContext } from "@/Context/LegacyContext"
import { PlayerNameView, SavedCardsView, TitleView } from "@/View"
import { t } from "@/i18n"

export default function AfterMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()

  const handleNexMission = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const l: Legacy = legacy.advance()
    setLegacy(l)
    legacyRepository.save(l)
  }

  return (
    <form onSubmit={handleNexMission}>
      {legacy.players.map(
        (player: Player): JSX.Element => (
          <div key={player.id}>
            <hgroup>
              <PlayerNameView player={player} />
              <TitleView player={player} />
            </hgroup>
            <div>
              {t("Title Points: %points%", {
                points: legacy.getTitlePoints(player),
              })}
            </div>
            <SavedCardsView player={player} type="project" />
          </div>
        ),
      )}
      <button type="submit">
        {legacy.currentMission + 1 < legacy.totalMissions ?
          t("Start mission %mission%", {
            mission: t(String(legacy.currentMission + 1), {}, "missionNames"),
          })
        : t("Finish")}
      </button>
    </form>
  )
}
