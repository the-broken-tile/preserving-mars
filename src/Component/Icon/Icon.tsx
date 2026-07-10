import { Fragment, JSX, ReactNode } from "react"
import icons from "./icons"
type Props = {
  type: "back" | "confirm" | "home" | "share"
  children?: ReactNode
}

export default function Icon({ type, children }: Props): JSX.Element {
  return (
    <Fragment>
      <img src={icons[type]} alt={type} /> {children ?? null}
    </Fragment>
  )
}
