import { FormEvent, JSX } from "react"
import { Legacy, MissionResult, Player } from "@/Model"
import { useLegacyContext } from "@/Context/LegacyContext"
import { legacyRepository } from "@/Repository"
import { PlayerRowView } from "@/View"
import { t } from "@/i18n"

export default function DuringMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()

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

  return (
    <div>
      <ul>
        {legacy.players.map(
          (player: Player): JSX.Element => (
            <PlayerRowView player={player} key={player.id}>
              <label htmlFor={`points-player-${player.id}`}>
                {t("Terraforming rating")}:{" "}
              </label>
              <button
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
            </PlayerRowView>
          ),
        )}
      </ul>
    </div>
  )
}
