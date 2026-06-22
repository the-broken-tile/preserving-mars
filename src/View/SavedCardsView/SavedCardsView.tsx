import { FormEvent, JSX, useState } from "react"
import { MissionResult, SavedCard } from "@/Model"
import { t } from "@/i18n"

type Props = {
  result: MissionResult
  onChange: (result: MissionResult) => void
}
export default function SavedCardsView({
  result,
  onChange,
}: Props): JSX.Element {
  const [adding, setAdding] = useState<boolean>(false)
  const [currentCardName, setCurrentCardName] = useState<string>("")
  const handleToggleSavingCards: VoidFunction = (): void => {
    setAdding((prev: boolean): boolean => !prev)
  }

  const handleDeleteSavedCard = (card: SavedCard): void => {
    onChange(result.removeSavedCard(card))
  }

  const handleSaveCurrentCard: VoidFunction = (): void => {
    if (currentCardName === "") {
      return
    }
    onChange(result.addSavedCard(new SavedCard(currentCardName)))
    setCurrentCardName("")
    setAdding(false)
  }

  const handleCurrentCardNameChange = (
    e: FormEvent<HTMLInputElement>,
  ): void => {
    setCurrentCardName(e.currentTarget.value)
  }

  const handleCancelAddingCard: VoidFunction = (): void => {
    setAdding(false)
    setCurrentCardName("")
  }

  return (
    <div>
      <h4>{t("Saved cards")}</h4>

      <ul>
        {result.savedCards.map(
          (card: SavedCard): JSX.Element => (
            <li key={card.id}>
              {card.name}{" "}
              <button
                className="button"
                onClick={() => handleDeleteSavedCard(card)}
              >
                ❌
              </button>
            </li>
          ),
        )}
        {adding ?
          <li>
            <input
              value={currentCardName}
              onInput={handleCurrentCardNameChange}
            />{" "}
            <button className="button" onClick={handleSaveCurrentCard}>
              ✅
            </button>
            <button className="button" onClick={handleCancelAddingCard}>
              ❌
            </button>
          </li>
        : <button className="button" onClick={handleToggleSavingCards}>
            {t("Save a card")}
          </button>
        }
      </ul>
    </div>
  )
}
