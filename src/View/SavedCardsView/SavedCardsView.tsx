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
  type: SavedCardType
}

export default function SavedCardsView({ player, type }: Props): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()
  const result: MissionResult = player.missionResults[legacy.currentMission]
  const [currentCardName, setCurrentCardName] = useState<string | null>(null)

  const canAdd = (): boolean => {
    if (type === "project") {
      return (
        legacy.getSavedCards(player).filter(c => c.type === "project").length <
        MAX_SAVED_PROJECT_CARDS
      )
    }

    if (type === "development") {
      return (
        result.savedCards.find(
          (c: SavedCard): boolean => c.type === "development",
        ) === undefined
      )
    }

    return true
  }

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

  const handleSaveCurrentCard = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (currentCardName === null) {
      return
    }
    onChange(result.addSavedCard(new SavedCard(currentCardName, type)))
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
    <Collapsible title={t("Saved cards")}>
      <ul>
        {legacy.getSavedCards(player).map(
          (card: SavedCard, i: number): JSX.Element => (
            <li key={i}>
              <SavedCardView
                card={card}
                onDelete={(): void => handleDeleteSavedCard(card)}
              />
            </li>
          ),
        )}
      </ul>
      {currentCardName !== null && (
        <form onSubmit={handleSaveCurrentCard}>
          <fieldset role="group">
            <input
              autoFocus={true}
              value={currentCardName}
              onInput={handleCurrentCardNameChange}
            />{" "}
            <button type="submit">✅</button>
            <button type="reset" onClick={handleCancelAddingCard}>
              ❌
            </button>
          </fieldset>
        </form>
      )}
      {canAdd() && currentCardName === null && (
        <button className="button" onClick={handleToggleSavingCards}>
          {t("Save a card")}
        </button>
      )}
    </Collapsible>
  )
}
