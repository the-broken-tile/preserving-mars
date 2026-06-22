import { FormEvent, JSX, useEffect, useState } from "react"
import { useParams } from "react-router"
import { legacyRepository } from "@/Repository"
import { Loading } from "@/Component"
import { Legacy, Phase } from "@/Model"
import {
  AfterMissionView,
  BeforeMissionView,
  DuringMissionView,
  FinishedLegacyView,
  LegacyNotFoundView,
} from "@/View"
import LegacyContext from "@/Context/LegacyContext"

const PHASE_MAP: Record<
  Exclude<Phase, "preparing">,
  (legacy: Legacy) => JSX.Element
> = {
  beforeMission: (): JSX.Element => <BeforeMissionView />,
  duringMission: (): JSX.Element => <DuringMissionView />,
  afterMission: (): JSX.Element => <AfterMissionView />,
  finished: (): JSX.Element => <FinishedLegacyView />,
}

export default function LegacyView(): JSX.Element {
  const { id } = useParams()
  const [legacy, setLegacy] = useState<Legacy | null | undefined>(undefined)
  const [editing, setEditing] = useState(false)

  useEffect((): void => {
    if (id === undefined) {
      return
    }

    setLegacy(legacyRepository.find(id))
  }, [id])

  if (legacy === undefined) {
    return <Loading />
  }

  if (legacy === null) {
    return <LegacyNotFoundView />
  }

  if (legacy.phase === "preparing") {
    return <div className="error">Oops, something went wrong!</div>
  }

  const handeStartEditing: VoidFunction = (): void => {
    setEditing((prev: boolean): boolean => !prev)
  }

  const handleNameChange = (e: FormEvent<HTMLInputElement>): void => {
    const l: Legacy = legacy.setName(e.currentTarget.value)
    setLegacy(l)
    legacyRepository.save(l)
  }

  return (
    <LegacyContext value={{ legacy, setLegacy }}>
      <h2>
        {editing ?
          <input value={legacy.name} onInput={handleNameChange} />
        : legacy.name}
        <button className="button" onClick={handeStartEditing}>
          ✏️
        </button>
      </h2>
      {PHASE_MAP[legacy.phase](legacy)}
    </LegacyContext>
  )
}
