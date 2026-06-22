import { JSX } from "react"
import { FullTitle, Player } from "@/Model"
import { useLegacyContext } from "@/Context"

type Props = {
  player: Player
}

export default function TitleView({ player }: Props): JSX.Element {
  const { legacy } = useLegacyContext()

  return (
    <ul>
      {legacy.getFullTitles(player).map(
        (title: FullTitle): JSX.Element => (
          <li key={`${title}`}>
            <h4>{`${title}`}</h4>
          </li>
        ),
      )}
    </ul>
  )
}
