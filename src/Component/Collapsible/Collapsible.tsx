import { JSX, ReactNode } from "react"

type Props = {
  children: ReactNode
  title: ReactNode
}

export default function Collapsible({ children, title }: Props): JSX.Element {
  return (
    <details>
      <summary role="button">{title}</summary>
      <div>{children}</div>
    </details>
  )
}
