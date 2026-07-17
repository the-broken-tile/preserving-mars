import { JSX } from "react"
import { Link, useParams } from "react-router"

import { Legacy } from "@/Model"
import { exportLegacy } from "@/util"
import { Icon, Loading, QR } from "@/Component"
import { legacyRepository } from "@/Repository"
import { LegacyNotFoundView } from ".."
import { t } from "@/i18n"

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
      <footer role="group">
        <Link to={`/legacy/${legacy.id}`} role="button">
          <Icon type="back">{t("Back")}</Icon>
        </Link>
      </footer>
    </div>
  )
}
