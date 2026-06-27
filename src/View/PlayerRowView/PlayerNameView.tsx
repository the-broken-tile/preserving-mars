import { JSX } from "react"
import { Player } from "@/Model"
import { Cube } from "@/Component"

type Props = {
  player: Player
}

export default function PlayerNameView({ player }: Props): JSX.Element {
  return (
    <h2 className="player-row">
      <Cube color={player.color} />
      {player.name}, CEO of {player.corporation.name}
    </h2>
  )
}
