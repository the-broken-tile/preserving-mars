import { Player } from "@/Model"
import { JSX, ReactNode } from "react"
import { Cube } from "@/Component/Cube"

type Props = {
  player: Player
  children?: ReactNode
}
export default function PlayerRowView({
  player,
  children,
}: Props): JSX.Element {
  return (
    <li>
      <h3>
        <Cube color={player.color} />
        {player.corporation.name}. CEO {player.name}
      </h3>
      {children}
    </li>
  )
}
