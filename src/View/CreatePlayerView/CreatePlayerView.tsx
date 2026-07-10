import { FormEvent, FormEventHandler, JSX } from "react"
import { t } from "@/i18n"
import { ValidationError } from "@/container/Validator"
import { Cube } from "@/Component/Cube"
import { Color, COLORS, Player } from "@/Model"

type Props = {
  player: Player
  onChange: (player: Player) => void
  disabledColors: Color[]
  errors: ValidationError[]
}

export default function CreatePlayerView({
  player,
  onChange,
  disabledColors,
  errors,
}: Props): JSX.Element {
  const handleNameChange: FormEventHandler<HTMLInputElement> = (
    e: FormEvent<HTMLInputElement>,
  ): void => {
    onChange(player.setName(e.currentTarget.value))
  }

  const handleCorporationChange: FormEventHandler<HTMLInputElement> = (
    e: FormEvent<HTMLInputElement>,
  ): void => {
    onChange(
      player.setCorporation(player.corporation.setName(e.currentTarget.value)),
    )
  }

  const handleColorChange: FormEventHandler<HTMLSelectElement> = (
    e: FormEvent<HTMLSelectElement>,
  ): void => {
    onChange(player.setColor(e.currentTarget.value as Color))
  }

  return (
    <article>
      <fieldset role="group">
        <label htmlFor={`name-${player.id}`}>
          {t("Name")}:
          <input
            onInput={handleNameChange}
            value={player.name}
            id={`name-${player.id}`}
          />
        </label>
      </fieldset>
      {errors
        .filter((e: ValidationError): boolean => e.field === "name")
        .map(
          (e: ValidationError, i: number): JSX.Element => (
            <small key={i}>{e.message}</small>
          ),
        )}
      <fieldset role="group">
        <label>
          {t("Corporation")}:
          <input
            onInput={handleCorporationChange}
            value={player.corporation?.name ?? ""}
            id={`corporation-${player.id}`}
          />
        </label>
      </fieldset>
      {errors
        .filter((e: ValidationError): boolean => e.field === "corporation")
        .map(
          (e: ValidationError, i: number): JSX.Element => (
            <div key={i} className="error">
              {e.message}
            </div>
          ),
        )}
      <div>
        <fieldset>
          <label htmlFor={`color-${player.id}`}>
            {t("Color")}
            <div role="group">
              <select
                onInput={handleColorChange}
                id={`color-${player.id}`}
                value={player.color ?? undefined}
              >
                {COLORS.map(
                  (color: Color): JSX.Element => (
                    <option
                      value={color}
                      disabled={disabledColors.includes(color)}
                      key={color}
                    >
                      {t(color, {}, "color")}
                    </option>
                  ),
                )}
              </select>
              {player.color && <Cube color={player.color} />}
            </div>
          </label>
        </fieldset>
      </div>
    </article>
  )
}
