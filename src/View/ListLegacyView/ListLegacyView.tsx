import { Fragment, JSX, useState } from "react"
import { Link } from "react-router"
import { t } from "@/i18n"
import { Legacy } from "@/Model"
import { legacyRepository } from "@/Repository"
import { Icon } from "@/Component"

export default function ListLegacyView(): JSX.Element {
  const [legacies, setLegacies] = useState<Legacy[]>(legacyRepository.findAll())

  const handleDeleteLegacy = (legacy: Legacy): void => {
    legacyRepository.delete(legacy)
    setLegacies((prev: Legacy[]): Legacy[] =>
      prev.filter((l: Legacy): boolean => !l.is(legacy)),
    )
  }
  return (
    <Fragment>
      {legacies.map(
        (l: Legacy): JSX.Element => (
          <article key={l.id} role="group">
            <Link to={`/legacy/${l.id}`} viewTransition>
              {l.name}
            </Link>
            <button onClick={(): void => handleDeleteLegacy(l)}>
              <Icon type="cancel" />
            </button>
          </article>
        ),
      )}
      <Link to="/new" className="button" viewTransition>
        {t("Create a new legacy")}
      </Link>
    </Fragment>
  )
}
