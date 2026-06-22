import { JSX, ReactNode } from "react"
import { Player } from "@/Model"
import { Cube } from "@/Component"

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
        {player.name}, CEO of {player.corporation.name}
      </h3>
      {children}
    </li>
  )
}
