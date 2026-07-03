import { JSX } from "react"
import { MissionResult, Player } from "@/Model"
import { useLegacyContext } from "@/Context"
import { t } from "@/i18n"

type Props = {
  player: Player
}

export default function StartingMegaCreditsView({
  player,
}: Props): JSX.Element {
  const { legacy } = useLegacyContext()

  const missionResult: MissionResult | undefined =
    legacy.getPreviousMissionResult(player)

  if (legacy.currentMission === 0) {
    // @todo add per corporation. Add per side A / side B.
    return <></>
  }

  if (missionResult === undefined) {
    console.error("Invalid StartingMegaCreditsView usage.")

    return <></>
  }

  return (
    <div>
      {t("Staring M€: %credits%", {
        credits: missionResult.startingMegaCredits,
      })}
    </div>
  )
}
