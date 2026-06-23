import { JSX, useEffect, useState } from "react"
import { NavigateFunction, useNavigate, useParams } from "react-router"
import { Legacy } from "@/Model"
import { importLegacy } from "@/util"
import { t } from "@/i18n"
import { legacyRepository } from "@/Repository"

export default function ImportLegacyView(): JSX.Element {
  const { encoded } = useParams()
  const [legacy, setLegacy] = useState<null | Legacy>(null)
  const navigate: NavigateFunction = useNavigate()

  useEffect((): void => {
    if (encoded === undefined) {
      return
    }

    const decoded: string = decodeURIComponent(encoded)
    setLegacy(importLegacy(decoded))
  }, [encoded])

  if (legacy === null) {
    return <></>
  }

  const handleImport: VoidFunction = (): void => {
    legacyRepository.save(legacy)
    navigate(`/legacy/${legacy.id}`)
  }

  return (
    <div>
      {t("Do you want to import the legacy of %legacy%", {
        legacy: legacy.name,
      })}
      <br />
      <button className="button" onClick={handleImport}>
        ${t("Import")}
      </button>
    </div>
  )
}
