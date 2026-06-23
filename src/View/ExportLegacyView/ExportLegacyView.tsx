import { JSX, useState } from "react"
import { Legacy } from "@/Model"
import { t } from "@/i18n"
import { exportLegacy } from "@/util"
import { QR } from "@/Component"

type Props = {
  legacy: Legacy
}

export default function ExportLegacyView({ legacy }: Props): JSX.Element {
  const [qr, setQr] = useState<string | null>(null)
  const handleExport: VoidFunction = (): void => {
    if (qr !== null) {
      setQr(null)

      return
    }

    const encoded: string = exportLegacy(legacy)

    // @todo hardcoded without the use of React routes, as it doesn't support hahses.
    setQr(`${window.location.origin}/#/import/${encodeURIComponent(encoded)}`)
  }

  return (
    <>
      <button className="button" onClick={handleExport}>
        {t("Export legacy")}
      </button>
      {qr && <QR text={qr} alt={`Export of ${legacy.name}`} />}
    </>
  )
}
