import { JSX } from "react"
import { Legacy, Player } from "@/Model"
import { t } from "@/i18n"
import { PlayerRowView } from "@/View"
import { useLegacyContext } from "@/Context/LegacyContext"
import { legacyRepository } from "@/Repository"

export default function BeforeMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()
  const handleStartMission: VoidFunction = (): void => {
    const l: Legacy = legacy.advance()
    legacyRepository.save(l)
    setLegacy(l)
  }

  // @todo add corporation choice - A or B (when corporations are known)
  // @todo Add reminder of which cards are in hand, don't do that for mission === 0
  return (
    <>
      <h3>
        {t("Preparation for mission %mission%", {
          mission: t(legacy.mission, {}, "missionNames"),
        })}
      </h3>
      <ul>
        {legacy.players.map(
          (player: Player): JSX.Element => (
            <PlayerRowView player={player} key={player.id} />
          ),
        )}
      </ul>
      <button type="button" onClick={handleStartMission}>
        {t("Start mission")}
      </button>
    </>
  )
}
