import { JSX, useState } from "react"
import { SavedCard } from "@/Model"
import classNames from "classnames"
import { HIDE_SAVED_CARDS } from "@/constants"

type Props = {
  card: SavedCard
  onDelete: VoidFunction
}

export default function SavedCardView({ card, onDelete }: Props): JSX.Element {
  const [hidden, setHidden] = useState<boolean>(HIDE_SAVED_CARDS)

  const handleClick: VoidFunction = (): void => {
    setHidden((prevHidden: boolean): boolean => !prevHidden)
  }

  return (
    <>
      <span onClick={handleClick} className={classNames({ blur: hidden })}>
        {card.name}
      </span>
      <button className="button" onClick={onDelete}>
        ❌
      </button>
    </>
  )
}
