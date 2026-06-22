import { JSX, useState } from "react"
import { Link } from "react-router"
import { legacyRepository } from "@/Repository"
import { Legacy } from "@/Model"

import "./list-legacy.css"
import { t } from "@/i18n"
import { useBodyClassName } from "@/Context"

export default function ListLegacyView(): JSX.Element {
  const [legacies, setLegacies] = useState<Legacy[]>(legacyRepository.findAll())

  useBodyClassName("home")

  const handleDeleteLegacy = (legacy: Legacy): void => {
    legacyRepository.delete(legacy)
    setLegacies((prev: Legacy[]): Legacy[] =>
      prev.filter(l => legacy.id !== l.id),
    )
  }
  return (
    <ul className="legacy-list">
      {legacies.map(
        (l: Legacy): JSX.Element => (
          <li key={l.id}>
            <Link to={`/legacy/${l.id}`} viewTransition>
              {l.name}
            </Link>
            <button
              className="button"
              onClick={(): void => handleDeleteLegacy(l)}
            >
              ❌
            </button>
          </li>
        ),
      )}
      <li>
        <Link to="/new" viewTransition>
          {t("Create a new legacy")}
        </Link>
      </li>
    </ul>
  )
}
