import { JSX } from "react"
import { Legacy } from "@/Model"

type Props = {
  legacy: Legacy
}

export default function FinishedLegacyView({ legacy }: Props): JSX.Element {
  return <>finished legacy</>
}
