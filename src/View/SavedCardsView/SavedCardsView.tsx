import { FormEvent, JSX, useState } from "react"
import { Legacy, MissionResult, Player, SavedCard } from "@/Model"
import { t } from "@/i18n"
import { useLegacyContext } from "@/Context"
import { legacyRepository } from "@/Repository"

type Props = {
  player: Player
}
export default function SavedCardsView({ player }: Props): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()
  const result: MissionResult = legacy.getCurrentMission(player)
  const [adding, setAdding] = useState<boolean>(false)
  const [currentCardName, setCurrentCardName] = useState<string>("")
  const handleToggleSavingCards: VoidFunction = (): void => {
    setAdding((prev: boolean): boolean => !prev)
  }

  const onChange = (result: MissionResult): void => {
    const l: Legacy = legacy.setMissionResult(player, result)
    setLegacy(l)
    legacyRepository.save(l)
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
