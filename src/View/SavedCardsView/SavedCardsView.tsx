import { FormEvent, JSX, useState } from "react"
import {
  Legacy,
  MissionResult,
  Player,
  SavedCard,
  SavedCardType,
} from "@/Model"
import { t } from "@/i18n"
import { useLegacyContext } from "@/Context"
import { legacyRepository } from "@/Repository"
import { SavedCardView } from "@/View"
import { MAX_SAVED_PROJECT_CARDS } from "@/constants"
import { Collapsible } from "@/Component"

type Props = {
  player: Player
  type?: SavedCardType
}
export default function SavedCardsView({ player, type }: Props): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()
  const result: MissionResult = legacy.getCurrentMission(player)
  const [currentCardName, setCurrentCardName] = useState<string | null>(null)

  const canAddCards: boolean =
    legacy.getSavedCards(player).filter(c => c.type === "project").length <
    MAX_SAVED_PROJECT_CARDS

  const handleToggleSavingCards: VoidFunction = (): void => {
    setCurrentCardName((prev: null | string): string | null =>
      prev === null ? "" : null,
    )
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
    if (currentCardName === null) {
      return
    }
    onChange(
      result.addSavedCard(new SavedCard(currentCardName, type ?? "project")),
    )
    setCurrentCardName(null)
  }

  const handleCurrentCardNameChange = (
    e: FormEvent<HTMLInputElement>,
  ): void => {
    setCurrentCardName(e.currentTarget.value)
  }

  const handleCancelAddingCard: VoidFunction = (): void => {
    setCurrentCardName(null)
  }

  return (
    <div>
      <Collapsible title={t("Saved cards")}>
        <ul>
          {legacy.getSavedCards(player).map(
            (card: SavedCard): JSX.Element => (
              <li key={card.id}>
                <SavedCardView
                  card={card}
                  onDelete={(): void => handleDeleteSavedCard(card)}
                />
              </li>
            ),
          )}
          {currentCardName !== null && (
            <li>
              <input
                value={currentCardName}
                onInput={handleCurrentCardNameChange}
              />{" "}
              <button onClick={handleSaveCurrentCard}>✅</button>
              <button onClick={handleCancelAddingCard}>❌</button>
            </li>
          )}
          {canAddCards && currentCardName === null && (
            <button className="button" onClick={handleToggleSavingCards}>
              {t("Save a card")}
            </button>
          )}
        </ul>
      </Collapsible>
    </div>
  )
}
