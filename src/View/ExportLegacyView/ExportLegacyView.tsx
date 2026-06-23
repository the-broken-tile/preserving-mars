import { JSX } from "react"
import { Link, useParams } from "react-router"

import { Legacy } from "@/Model"
import { exportLegacy } from "@/util"
import { BottomMenu, Loading, QR } from "@/Component"
import { legacyRepository } from "@/Repository"
import { LegacyNotFoundView } from ".."
import { t } from "@/i18n"
import { back } from "@/icons"

export default function ExportLegacyView(): JSX.Element {
  const { id } = useParams()

  if (id === undefined) {
    return <Loading />
  }

  const legacy: Legacy | null = legacyRepository.find(id)

  if (legacy === null) {
    return <LegacyNotFoundView />
  }

  return (
    <div>
      <h2>{t("Scan to import on another device.")}</h2>
      <QR
        text={`${window.location.origin}/#/import/${encodeURIComponent(exportLegacy(legacy))}`}
        alt={`Export of ${legacy.name}`}
      />
      <BottomMenu>
        <Link to={`/legacy/${legacy.id}`}>
          <img src={back} alt="back" />
        </Link>
      </BottomMenu>
    </div>
  )
}
