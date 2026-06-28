import { JSX, useEffect, useState } from "react"
import classNames from "classnames"

import { t } from "@/i18n"
import { useLegacyContext } from "@/Context"
import { Legacy, MissionResult, Player } from "@/Model"
import { legacyRepository } from "@/Repository"

type Props = {
  player: Player
}

export default function PassingOrderView({ player }: Props): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()
  const [pills, setPills] = useState<boolean[]>([])

  useEffect((): void => {
    const order: number | null = legacy.getCurrentMission(player).passingOrder
    const l: number = legacy.players.length
    const p: boolean[] = Array(l).fill(false)
    if (order !== null) {
      p[order - 1] = true
    }

    setPills(p)
  }, [player, legacy])

  const handleSelectPosition = (position: number): void => {
    const result: MissionResult = legacy.getCurrentMission(player)

    if (result.passingOrder === position) {
      const l: Legacy = legacy.setMissionResult(
        player,
        result.setPassingOrder(null),
      )
      setLegacy(l)
      legacyRepository.save(l)

      return
    }

    const [otherPlayer, otherMissionResult] = [
      ...legacy.getCurrentPlayerMissions().entries(),
    ].find(([_, mission]): boolean => {
      return mission.passingOrder === position
    }) ?? [null, null]

    let l: Legacy = legacy.setMissionResult(
      player,
      result.setPassingOrder(position),
    )

    if (otherPlayer !== null && otherMissionResult !== null) {
      l = l.setMissionResult(
        otherPlayer,
        otherMissionResult.setPassingOrder(result.passingOrder), // exchange them
      )
    }

    setLegacy(l)
    legacyRepository.save(l)
  }

  return (
    <div>
      <label>{t("Passing order")}:</label>
      {pills.map(
        (active: boolean, position: number): JSX.Element => (
          <button
            key={position}
            className={classNames({ selected: active })}
            type="button"
            onClick={() => handleSelectPosition(position + 1)}
          >
            {position + 1}
          </button>
        ),
      )}
    </div>
  )
}
