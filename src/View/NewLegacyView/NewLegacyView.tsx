import { FormEvent, FormEventHandler, JSX, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router"
import { t } from "@/i18n"
import { MAX_PLAYERS, MIN_PLAYERS, ENABLE_TEAMS } from "@/constants"
import { Toggle } from "@/Component"
import { CreatePlayerView } from "@/View"
import { ValidationError, validator } from "@/container/Validator"
import { Color, Legacy, Player } from "@/Model"
import { chooseNext } from "@/Model/Color"
import { legacyRepository } from "@/Repository"

import "./new-legacy-view.css"

export default function NewLegacyView(): JSX.Element {
  const [players, setPlayers] = useState<Player[]>([
    Player.create("black"),
    Player.create("red"),
  ])
  const [errors, setErrors] = useState<string[]>([])
  const navigate: NavigateFunction = useNavigate()

  const handleAddPlayer: VoidFunction = (): void => {
    if (players.length === MAX_PLAYERS) {
      return
    }

    setPlayers((prev: Player[]): Player[] => [
      ...prev,
      Player.create(chooseNext(prev.map(p => p.color))),
    ])
  }

  const handleRemovePlayer: VoidFunction = (): void => {
    if (players.length === MIN_PLAYERS) {
      return
    }
    setPlayers((prev: Player[]): Player[] => prev.slice(0, -1))
  }

  const handlePlayerChange = (player: Player): void => {
    const i: number = players.findIndex(
      (p: Player): boolean => p.id === player.id,
    )

    setPlayers((prev: Player[]): Player[] => [
      ...prev.slice(0, i),
      player,
      ...prev.slice(i + 1),
    ])
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault()
    const errs: string[] = players
      .map((r: Player): string[] => {
        return validator
          .validate(r)
          .map((e: ValidationError): string => e.message)
      })
      .flat()

    setErrors(errs)
    if (errs.length > 0) {
      return
    }

    const legacy: Legacy = Legacy.create(players).advance()
    legacyRepository.save(legacy)

    navigate(`/legacy/${legacy.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="new-player-form">
      <div className="players-count">
        <button
          type="button"
          className="button"
          onClick={handleRemovePlayer}
          disabled={players.length === MIN_PLAYERS}
        >
          -
        </button>
        <span>
          {t("Players: %players%", {
            players: players.length,
          })}
        </span>
        <button
          type="button"
          className="button"
          onClick={handleAddPlayer}
          disabled={players.length === MAX_PLAYERS}
        >
          +
        </button>
      </div>
      <ul>
        {players.map(
          (r: Player): JSX.Element => (
            <li key={r.id}>
              <CreatePlayerView
                player={r}
                onChange={handlePlayerChange}
                disabledColors={players.map<Color>(
                  (p: Player): Color => p.color,
                )}
              />
            </li>
          ),
        )}
        {ENABLE_TEAMS && (
          <li>
            Teams: <Toggle value={false} onInput={(): void => {}} />
          </li>
        )}
      </ul>
      {errors.length > 0 && (
        <ul>
          {errors.map(
            (error: string): JSX.Element => (
              <li className="error" key={error}>
                {error}
              </li>
            ),
          )}
        </ul>
      )}
      <input type="submit" className="button" value={`${t("Save")}`} />
    </form>
  )
}
