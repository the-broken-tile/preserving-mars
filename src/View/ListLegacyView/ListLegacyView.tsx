import { JSX, useState } from "react"
import { legacyRepository } from "@/Repository"
import { Legacy } from "@/Model"

export default function ListLegacyView(): JSX.Element {
  const [legacies, setLegacies] = useState<Legacy[]>(legacyRepository.findAll())

  return (
    <ul>
      {legacies.map(
        (l: Legacy): JSX.Element => (
          <li key={l.id}>{l.name}</li>
        ),
      )}
    </ul>
  )
}
