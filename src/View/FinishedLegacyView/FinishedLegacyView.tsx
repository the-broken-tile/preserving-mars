import { JSX } from "react"
import { useLegacyContext } from "@/Context/LegacyContext"
import { PlayerNameView, TitleView } from "@/View"
import { t } from "@/i18n"

export default function FinishedLegacyView(): JSX.Element {
  const { legacy } = useLegacyContext()

  return (
    <div>
      {legacy.getFinalStanding().map(([player, points]): JSX.Element => {
        return (
          <hgroup key={player.id}>
            <PlayerNameView player={player} />
            <TitleView player={player} />
            <h5>{t("Final score: %points%", { points })}</h5>
          </hgroup>
        )
      })}
    </div>
  )
}
