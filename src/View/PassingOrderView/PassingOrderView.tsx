import { FormEvent, JSX } from "react"
import { t } from "@/i18n"
import { useLegacyContext } from "@/Context"
import { Legacy, MissionResult, Player } from "@/Model"
import { legacyRepository } from "@/Repository"

type Props = {
  player: Player
}

export default function PassingOrderView({ player }: Props): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()
  const playerMissions: Map<Player, MissionResult> =
    legacy.getCurrentPlayerMissions()
  const order: number | null = legacy.getCurrentMission(player).passingOrder

  const handlePassingOrderChange = (e: FormEvent<HTMLInputElement>): void => {
    const value: string = e.currentTarget.value
    const o: number | null = value === "" ? null : Number(value)
    const passingOrder: number | null = o === 0 ? null : o

    const result: MissionResult = legacy.getCurrentMission(player)
    const l: Legacy = legacy.setMissionResult(
      player,
      result.setPassingOrder(passingOrder),
    )

    legacyRepository.save(l)
    setLegacy(l)
  }

  return (
    <div>
      <label htmlFor={`passing-order-${player.id}`}>
        {t("Passing order")}:
      </label>
      <input
        id={`passing-order-${player.id}`}
        type="number"
        min={0 /** converted to null */}
        step={1}
        max={playerMissions.size}
        value={order ?? ""}
        onInput={handlePassingOrderChange}
      />
    </div>
  )
}
