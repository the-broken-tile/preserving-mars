import { FormEvent, Fragment, JSX } from "react"
import { Legacy, Player } from "@/Model"
import { t } from "@/i18n"
import { PlayerNameView, TitleView } from "@/View"
import { useLegacyContext } from "@/Context/LegacyContext"
import { legacyRepository } from "@/Repository"
import SavedCardsView from "../SavedCardsView/SavedCardsView"
import StartingMegaCreditsView from "../StartingMegaCreditsView/StartingMegaCreditsView"

export default function BeforeMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()
  const handleStartMission = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const l: Legacy = legacy.advance()
    legacyRepository.save(l)
    setLegacy(l)
  }

  return (
    <Fragment>
      <h3>
        {t("Preparation for mission %mission%", {
          mission: t(legacy.currentMission, {}, "missionNames"),
        })}
      </h3>
      {legacy.players.map(
        (player: Player): JSX.Element => (
          <article key={player.id}>
            <hgroup>
              <PlayerNameView player={player} />
              <TitleView player={player} />
            </hgroup>
            <StartingMegaCreditsView player={player} />
            <SavedCardsView player={player} type="development" />
          </article>
        ),
      )}
      <form onSubmit={handleStartMission}>
        <button type="submit" className="button">
          {t("Start mission")}
        </button>
      </form>
    </Fragment>
  )
}
