import { FormEvent, FormEventHandler, JSX } from "react"
import { Color, COLORS, Player } from "@/Model"
import { Cube } from "@/Component/Cube"
import { t } from "@/i18n"

import "./create-player-view.css"

type Props = {
  player: Player
  onChange: (player: Player) => void
  disabledColors: Color[]
}

export default function CreatePlayerView({
  player,
  onChange,
  disabledColors,
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
    <>
      <label htmlFor={`name-${player.id}`}>{t("Name")}: </label>
      <input
        onInput={handleNameChange}
        value={player.name}
        id={`name-${player.id}`}
      />
      <label htmlFor={`corporation-${player.id}`}>{t("Corporation")}:</label>
      <input
        onInput={handleCorporationChange}
        value={player.corporation?.name ?? ""}
        id={`corporation-${player.id}`}
      />
      <label htmlFor={`color-${player.id}`} className="color-label">
        {t("Color")}
      </label>
      <select
        onInput={handleColorChange}
        id={`color-${player.id}`}
        value={player.color ?? undefined}
      >
        {COLORS.map(
          (color: Color, i: number): JSX.Element => (
            <option
              value={color}
              disabled={disabledColors.includes(color)}
              key={i}
            >
              {t(color)}
            </option>
          ),
        )}
      </select>
      {player.color && <Cube color={player.color} />}
    </>
  )
}
