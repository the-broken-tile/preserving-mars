import { JSX, Fragment } from "react"
import { Player, Title } from "@/Model"
import { useLegacyContext } from "@/Context"
import { Badge } from "@/Component"
import { t } from "@/i18n"

import "./titles.css"

type Props = {
  player: Player
}

export default function TitleView({ player }: Props): JSX.Element {
  const { legacy } = useLegacyContext()

  return (
    <h4 className="title-row">
      {legacy.getTitles(player).map(
        (title: Title, i: number): JSX.Element => (
          <Fragment key={i}>
            <Badge
              title={title.name}
              mission={t(title.mission, {}, "missionNames")}
            />
          </Fragment>
        ),
      )}
    </h4>
  )
}
