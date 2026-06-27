import { FormEvent, Fragment, JSX, useState } from "react"
import { Legacy, MissionResult, Player } from "@/Model"
import { useLegacyContext } from "@/Context/LegacyContext"
import { legacyRepository } from "@/Repository"
import {
  PassingOrderView,
  PlayerNameView,
  SavedCardsView,
  TerraformingRatingView,
} from "@/View"
import { t } from "@/i18n"
import { titleCalculator } from "@/TitleCalculator"

export default function DuringMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()
  const [finishing, setFinishing] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])

  const handlePointsChange =
    (player: Player) =>
    (points: number): void => {
      const result: MissionResult = legacy.getCurrentMission(player)
      const l: Legacy = legacy.setMissionResult(
        player,
        result.setPoints(points),
      )

      legacyRepository.save(l)
      setLegacy(l)
    }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (legacy.hasToResolveTies()) {
      setFinishing(true)

      return
    }
    const l: Legacy = titleCalculator.updateTitles(legacy).advance()
    legacyRepository.save(l)
    setLegacy(l)
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {legacy.players.map(
          (player: Player): JSX.Element => (
            <Fragment key={player.id}>
              <PlayerNameView player={player} />
              <TerraformingRatingView
                points={legacy.getCurrentMission(player).points}
                onChange={handlePointsChange(player)}
                id={player.id}
              />
              {finishing && <PassingOrderView player={player} />}
              <SavedCardsView player={player} type="innovation" />
            </Fragment>
          ),
        )}
      </ul>
      <button type="submit" className="button">
        {t("Finish mission")}
      </button>
    </form>
  )
}
