import { FormEvent, JSX, useState } from "react"
import { Legacy, MissionResult, Player } from "@/Model"
import { useLegacyContext } from "@/Context/LegacyContext"
import { legacyRepository } from "@/Repository"
import { PlayerRowView } from "@/View"
import { t } from "@/i18n"
import { titleCalculator } from "@/TitleCalculator"

export default function DuringMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()
  const [errors, setErrors] = useState<string[]>([])

  const setPoints = (player: Player, points: number): void => {
    const result: MissionResult = legacy.getCurrentMission(player)
    const l: Legacy = legacy.setMissionResult(player, result.setPoints(points))

    legacyRepository.save(l)
    setLegacy(l)
  }

  const handleDecreasePoints = (player: Player): void => {
    setPoints(player, legacy.getCurrentMission(player).points - 1)
  }

  const handleIncreasePoints = (player: Player): void => {
    setPoints(player, legacy.getCurrentMission(player).points + 1)
  }

  const handlePassingOrderChange =
    (player: Player) =>
    (e: FormEvent<HTMLInputElement>): void => {
      const value: string = e.currentTarget.value
      const passingOrder: number | null = value === "" ? null : Number(value)

      const result: MissionResult = legacy.getCurrentMission(player)
      const l: Legacy = legacy.setMissionResult(
        player,
        result.setPassingOrder(passingOrder),
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
              <div>
                <label htmlFor={`points-player-${player.id}`}>
                  {t("Terraforming rating")}:{" "}
                </label>
                <button
                  className="button"
                  type="button"
                  onClick={(): void => handleDecreasePoints(player)}
                >
                  -
                </button>
                <input
                  type="number"
                  id={`points-player-${player.id}`}
                  onInput={(e: FormEvent<HTMLInputElement>): void =>
                    setPoints(player, Number(e.currentTarget.value))
                  }
                  value={legacy.getCurrentMission(player).points}
                />
                <button
                  type="button"
                  onClick={(): void => handleIncreasePoints(player)}
                >
                  +
                </button>
              </div>
              {legacy.hasTies() && (
                <div>
                  <label htmlFor={`passing-order-${player.id}`}>
                    {t("Passing order")}:
                  </label>
                  <input
                    id={`passing-order-${player.id}`}
                    type="number"
                    value={legacy.getCurrentMission(player).passingOrder ?? ""}
                    onInput={handlePassingOrderChange(player)}
                  />
                </div>
              )}
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
