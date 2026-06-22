import { JSX } from "react"
import { Legacy, Player } from "@/Model"
import { legacyRepository } from "@/Repository"
import { useLegacyContext } from "@/Context/LegacyContext"
import { PlayerRowView, TitleView } from "@/View"
import { t } from "@/i18n"
import { MISSION_COUNT } from "@/constants"

export default function AfterMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()

  return (
    <div>
      {legacy.players.map(
        (player: Player): JSX.Element => (
          <PlayerRowView player={player} key={player.id}>
            <TitleView player={player} />
            <hr />
          </PlayerRowView>
        ),
      )}
      {legacy.mission !== MISSION_COUNT ?
        <button type="button" className="button">
          {t("Start mission %mission%", {
            mission: t(String(legacy.mission + 1), {}, "missionNames"),
          })}
        </button>
      : null}
    </div>
  )
}
