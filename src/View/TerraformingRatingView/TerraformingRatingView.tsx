import { FormEvent, JSX } from "react"
import { t } from "@/i18n"

type Props = {
  points: number
  onChange: (value: number) => void
  id: string
}

export default function TerraformingRatingView({
  id,
  points,
  onChange,
}: Props): JSX.Element {
  const handleDecreasePoints: VoidFunction = (): void => {
    onChange(points - 1)
  }

  const handleInputChange = (e: FormEvent<HTMLInputElement>): void => {
    onChange(Number(e.currentTarget.value))
  }

  const handleIncreasePoints: VoidFunction = (): void => {
    onChange(points + 1)
  }

  return (
    <div>
      <label htmlFor={`points-player-${id}`}>
        {t("Terraforming rating")}:{" "}
      </label>
      <button type="button" onClick={handleDecreasePoints}>
        -
      </button>
      <input
        type="number"
        id={`points-player-${id}`}
        onInput={handleInputChange}
        value={points}
      />
      <button type="button" onClick={handleIncreasePoints}>
        +
      </button>
    </div>
  )
}
