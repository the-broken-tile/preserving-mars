import { FormEvent, JSX, useState } from "react"
import { useLegacyContext } from "@/Context"
import { Legacy } from "@/Model"
import { legacyRepository } from "@/Repository"

export default function LegacyNameView(): JSX.Element {
  const [editing, setEditing] = useState<boolean>(false)
  const { legacy, setLegacy } = useLegacyContext()

  const handeStartEditing: VoidFunction = (): void => {
    setEditing((prev: boolean): boolean => !prev)
  }

  const handleNameChange = (e: FormEvent<HTMLInputElement>): void => {
    const l: Legacy = legacy.setName(e.currentTarget.value)
    setLegacy(l)
    legacyRepository.save(l)
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setEditing(false)
  }

  return (
    <>
      {editing ?
        <form onSubmit={handleFormSubmit}>
          <input
            autoFocus={true}
            value={legacy.name}
            onInput={handleNameChange}
          />
          <button type="submit">✏️</button>
        </form>
      : <h2>
          {legacy.name} <button onClick={handeStartEditing}>✏️</button>
        </h2>
      }
    </>
  )
}
