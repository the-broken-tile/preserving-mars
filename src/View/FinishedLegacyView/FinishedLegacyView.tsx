import { JSX } from "react"
import { useLegacyContext } from "@/Context/LegacyContext"

export default function FinishedLegacyView(): JSX.Element {
  const { legacy } = useLegacyContext()

  return (
    <div>
      A finished legacy of
      <br />
      {legacy.name}
    </div>
  )
}
