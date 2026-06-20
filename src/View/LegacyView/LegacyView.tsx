import { JSX, useEffect, useState } from "react"
import { useParams } from "react-router"
import { legacyRepository } from "@/Repository"
import { Loading } from "@/Component"
import { Legacy } from "@/Model"

export default function LegacyView(): JSX.Element {
  const { id } = useParams()
  const [legacy, setLegacy] = useState<Legacy | null>(null)

  useEffect((): void => {
    if (id === undefined) {
      return
    }

    setLegacy(legacyRepository.get(id))
  }, [id])

  if (legacy === null) {
    return <Loading />
  }

  return <>{legacy.name}</>
}
