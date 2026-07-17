import { JSX, useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { legacyRepository } from "@/Repository"
import { Icon, Loading } from "@/Component"
import { Legacy, Phase } from "@/Model"
import { AFTER, BEFORE, DURING, FINISHED, PREPARING } from "@/Model/Phase"
import {
  AfterMissionView,
  BeforeMissionView,
  DuringMissionView,
  FinishedLegacyView,
  LegacyNameView,
  LegacyNotFoundView,
} from "@/View"
import LegacyContext from "@/Context/LegacyContext"
import { t } from "@/i18n"

const PHASE_MAP: Record<
  Exclude<Phase, "p">,
  (legacy: Legacy) => JSX.Element
> = {
  [BEFORE]: (): JSX.Element => <BeforeMissionView />,
  [DURING]: (): JSX.Element => <DuringMissionView />,
  [AFTER]: (): JSX.Element => <AfterMissionView />,
  [FINISHED]: (): JSX.Element => <FinishedLegacyView />,
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

  if (legacy.phase === PREPARING) {
    return <div className="error">Oops, something went wrong!</div>
  }

  return (
    <LegacyContext value={{ legacy, setLegacy }}>
      <LegacyNameView />
      <main>{PHASE_MAP[legacy.phase](legacy)}</main>
      <footer role="group">
        <Link to="/" role="button">
          <Icon type="home">{t("Home")}</Icon>
        </Link>
        <Link to={`/legacy/${legacy.id}/export`} role="button">
          <Icon type="share">{t("Share")}</Icon>
        </Link>
      </footer>
    </LegacyContext>
  )
}
