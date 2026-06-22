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

const PHASE_MAP: Record<
  Exclude<Phase, "preparing">,
  (legacy: Legacy) => JSX.Element
> = {
  beforeMission: (legacy: Legacy): JSX.Element => (
    <BeforeMissionView legacy={legacy} />
  ),
  duringMission: (legacy: Legacy): JSX.Element => (
    <DuringMissionView legacy={legacy} />
  ),
  afterMission: (legacy: Legacy): JSX.Element => (
    <AfterMissionView legacy={legacy} />
  ),
  finished: (legacy: Legacy): JSX.Element => (
    <FinishedLegacyView legacy={legacy} />
  ),
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
    <>
      <h2>{legacy.name}</h2>
      {PHASE_MAP[legacy.phase](legacy)}
    </>
  )
}
