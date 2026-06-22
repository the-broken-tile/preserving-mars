import { JSX, useEffect, useState } from "react"
import { useParams } from "react-router"
import { legacyRepository } from "@/Repository"
import { Loading } from "@/Component"
import { Legacy, Phase } from "@/Model"
import {
  AfterMissionView,
  BeforeMissionView,
  DuringMissionView,
  FinishedLegacyView,
} from "@/View"
import LegacyContext from "@/Context/LegacyContext"

const PHASE_MAP: Record<
  Exclude<Phase, "preparing">,
  (legacy: Legacy) => JSX.Element
> = {
  beforeMission: (): JSX.Element => <BeforeMissionView />,
  duringMission: (): JSX.Element => <DuringMissionView />,
  afterMission: (): JSX.Element => <AfterMissionView />,
  finished: (legacy: Legacy): JSX.Element => <FinishedLegacyView />,
}

export default function LegacyView(): JSX.Element {
  const { id } = useParams()
  const [legacy, setLegacy] = useState<Legacy | null>(null)

  useEffect((): void => {
    if (id === undefined) {
      return
    }

    setLegacy(legacyRepository.get(id))
  }, [id])

  if (legacy === null) {
    return <Loading />
  }

  if (legacy.phase === "preparing") {
    return <div className="error">Oops, something went wrong!</div>
  }

  return (
    <LegacyContext value={{ legacy, setLegacy }}>
      <h2>{legacy.name}</h2>
      {PHASE_MAP[legacy.phase](legacy)}
    </LegacyContext>
  )
}
