import { JSX, ReactNode } from "react"

type Props = {
  children?: ReactNode
}

export default function BottomMenu({ children }: Props): JSX.Element {
  return <nav className="bottom-menu">{children ?? null}</nav>
}
