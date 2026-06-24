import { JSX, useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { legacyRepository } from "@/Repository"
import { BottomMenu, Loading } from "@/Component"
import { Legacy, Phase } from "@/Model"
import {
  AfterMissionView,
  BeforeMissionView,
  DuringMissionView,
  FinishedLegacyView,
  LegacyNameView,
  LegacyNotFoundView,
} from "@/View"
import LegacyContext from "@/Context/LegacyContext"
import { home, share } from "@/icons"

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

  return (
    <LegacyContext value={{ legacy, setLegacy }}>
      <LegacyNameView />
      {PHASE_MAP[legacy.phase](legacy)}
      <BottomMenu>
        <Link to="/">
          <img src={home} alt="home" />
        </Link>
        <Link to={`/legacy/${legacy.id}/export`}>
          <img src={share} alt="share" />
        </Link>
      </BottomMenu>
    </LegacyContext>
  )
}
