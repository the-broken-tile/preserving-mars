import { JSX } from "react"
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
    <ul>
      {legacy.getTitles(player).map(
        (title: Title): JSX.Element => (
          <li key={`${title}`}>
            <h4 className="title-row">
              <Badge
                title={title.name}
                mission={t(title.mission, {}, "missionNames")}
              />
              {`${title}`}
            </h4>
          </li>
        ),
      )}
    </ul>
  )
}
