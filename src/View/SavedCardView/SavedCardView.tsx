import { JSX, useEffect, useState } from "react"
import { SavedCard } from "@/Model"
import { useLegacyContext } from "@/Context"
import { AFTER, DURING } from "@/Model/Phase"
import { Icon } from "@/Component"

type Props = {
  card: SavedCard
  onDelete: VoidFunction
}

export default function SavedCardView({ card, onDelete }: Props): JSX.Element {
  const { legacy } = useLegacyContext()
  const [canRemove, setCanRemove] = useState<boolean>(true)

  useEffect((): void => {
    if (legacy.phase === AFTER) {
      setCanRemove(card.type === "project")

      return
    }

    if (legacy.phase === DURING) {
      setCanRemove(card.type === "innovation")

      return
    }
  }, [legacy, card])

  return (
    <>
      <span>
        {card.name} [{card.type}]
      </span>
      {canRemove && (
        <button onClick={onDelete} type="reset">
          <Icon type="cancel" />
        </button>
      )}
    </>
  )
}
