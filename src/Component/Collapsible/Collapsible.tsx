import { JSX, ReactNode } from "react"
import { v4 } from "uuid"

import "./collapsible.css"

type Props = {
  id?: string
  children: ReactNode
  title: ReactNode
}

export default function Collapsible({
  children,
  title,
  id,
}: Props): JSX.Element {
  const realId: string = id ?? `collapsible-${v4()}`

  return (
    <div className="wrap-collapsible">
      <input id={realId} className="toggle" type="checkbox" />
      <label htmlFor={realId} className="label-toggle">
        {title}
      </label>
      <div className="collapsible-content">
        <div className="content-inner">{children}</div>
      </div>
    </div>
  )
}
