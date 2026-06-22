import { JSX } from "react"
import { Link, useParams } from "react-router"
import { t } from "@/i18n"

export default function LegacyNotFoundView(): JSX.Element {
  const { id } = useParams()

  return (
    <>
      <div className="error">
        {t("Legacy with id %id% not found.", { id: id as string })}
      </div>
      <div>
        <Link to={"/"}>{t("Go back")}</Link>
      </div>
    </>
  )
}
