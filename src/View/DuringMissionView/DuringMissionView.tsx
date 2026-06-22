import { FormEvent, JSX, useState } from "react"
import { Legacy, MissionResult, Player } from "@/Model"
import { useLegacyContext } from "@/Context/LegacyContext"
import { legacyRepository } from "@/Repository"
import {
  PassingOrderView,
  PlayerRowView,
  SavedCardsView,
  TerraformingRatingView,
} from "@/View"
import { t } from "@/i18n"
import { titleCalculator } from "@/TitleCalculator"

export default function DuringMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()
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
      // Shouldn't happen, because the submit button is disabled.
      setErrors([t("Specify passing order for tied players")])

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
            <PlayerRowView player={player} key={player.id}>
              <TerraformingRatingView
                points={legacy.getCurrentMission(player).points}
                onChange={handlePointsChange(player)}
                id={player.id}
              />
              {legacy.hasTies() && <PassingOrderView player={player} />}
              <SavedCardsView player={player} type="innovation" />
            </PlayerRowView>
          ),
        )}
      </ul>
      <ul>
        {errors.map(
          (error: string, i: number): JSX.Element => (
            <li className="error" key={i}>
              {error}
            </li>
          ),
        )}
      </ul>
      <button
        type="submit"
        disabled={legacy.hasToResolveTies()}
        className="button"
      >
        {t("Finish mission")}
      </button>
    </form>
  )
}
