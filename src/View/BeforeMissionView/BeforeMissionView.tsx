import { JSX } from "react"
import { Legacy } from "@/Model"

type Props = {
  legacy: Legacy
}

export default function BeforeMissionView({ legacy }: Props): JSX.Element {
  return <>before</>
}
