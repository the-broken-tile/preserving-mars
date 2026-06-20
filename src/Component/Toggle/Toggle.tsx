import { JSX } from "react"
import "./toggle.css"

type Props = {
  value: boolean
  onInput: (on: boolean) => void
}

export default function Toggle({ value, onInput }: Props): JSX.Element {
  const handleInput: VoidFunction = (): void => {
    onInput(!value)
  }

  return (
    <div className="toggle">
      <input type="checkbox" onInput={handleInput} />
      <label></label>
    </div>
  )
}
