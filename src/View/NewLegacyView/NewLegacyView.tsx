import { FormEvent, FormEventHandler, Fragment, JSX, useState } from "react"
import { Link, NavigateFunction, useNavigate } from "react-router"
import { t } from "@/i18n"
import { DEBUG, MAX_PLAYERS, MIN_PLAYERS, MISSION_LENGTHS } from "@/constants"
import { CreatePlayerView } from "@/View"
import { ValidationError, validator } from "@/container/Validator"
import { Color, Corporation, Legacy, Player } from "@/Model"
import { chooseNext } from "@/Model/Color"
import { legacyRepository } from "@/Repository"
import { Icon } from "@/Component"
import { legacyFactory } from "@/container"

const initialValues: Player[] =
  DEBUG ?
    [
      Player.create("b")
        .setName("Player 1")
        .setCorporation(Corporation.create("Corporation 1")),
      Player.create("r")
        .setName("Player 2")
        .setCorporation(Corporation.create("Corporation 2")),
    ]
  : [Player.create("b"), Player.create("r")]

export default function NewLegacyView(): JSX.Element {
  const [missions, setMissions] = useState<number>(MISSION_LENGTHS[0])
  const [players, setPlayers] = useState<Player[]>(initialValues)
  const [errors, setErrors] = useState<ValidationError[]>([])
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
    const i: number = players.findIndex((p: Player): boolean => p.is(player))

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
    const errs: ValidationError[] = players
      .map((r: Player): ValidationError[] => {
        return validator.validate(r)
      })
      .flat()

    setErrors(errs)
    if (errs.length > 0) {
      return
    }

    const legacy: Legacy = legacyFactory.build(players, missions)
    legacyRepository.save(legacy)

    navigate(`/legacy/${legacy.id}`)
  }

  const handleMissionsChange = (e: FormEvent<HTMLInputElement>): void => {
    setMissions(Number(e.currentTarget.value))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset role="group">
          <button
            type="button"
            className="button"
            onClick={handleRemovePlayer}
            disabled={players.length === MIN_PLAYERS}
          >
            -
          </button>
          {t("Players: %players%", {
            players: players.length,
          })}
          <button
            type="button"
            className="button"
            onClick={handleAddPlayer}
            disabled={players.length === MAX_PLAYERS}
          >
            +
          </button>
        </fieldset>
        <main>
          {players.map(
            (player: Player): JSX.Element => (
              <Fragment key={player.id}>
                <CreatePlayerView
                  errors={errors.filter(e => e.entityId === player.id)}
                  player={player}
                  onChange={handlePlayerChange}
                  disabledColors={players.map<Color>(
                    (p: Player): Color => p.color,
                  )}
                />
              </Fragment>
            ),
          )}
        </main>
        <fieldset role="group">
          <legend>{t("Missions")}</legend>
          {MISSION_LENGTHS.map(
            (m: number): JSX.Element => (
              <label key={m}>
                <input
                  type="radio"
                  value={m}
                  checked={m === missions}
                  onChange={handleMissionsChange}
                />
                {m}
              </label>
            ),
          )}
        </fieldset>
        <fieldset role="group">
          <button type="submit">
            <Icon type="confirm">{t("Save")}</Icon>
          </button>
          <Link to="/" role="button">
            <Icon type="home">{t("Back")}</Icon>
          </Link>
        </fieldset>
      </form>
    </>
  )
}
