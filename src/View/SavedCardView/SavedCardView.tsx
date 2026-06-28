import { JSX, useEffect, useState } from "react"
import { SavedCard } from "@/Model"
import { useLegacyContext } from "@/Context"

type Props = {
  card: SavedCard
  onDelete: VoidFunction
}

export default function SavedCardView({ card, onDelete }: Props): JSX.Element {
  const { legacy } = useLegacyContext()
  const [canRemove, setCanRemove] = useState<boolean>(true)

  useEffect((): void => {
    if (legacy.phase === "afterMission") {
      setCanRemove(card.type === "project")

      return
    }

    if (legacy.phase === "duringMission") {
      setCanRemove(card.type === "innovation")

      return
    }
  }, [legacy, card])

  return (
    <>
      <span>
        {card.name} [{card.type}]
      </span>
      {canRemove && <button onClick={onDelete}>❌</button>}
    </>
  )
}
