import { Color } from "@/Model"
import { CSSProperties, JSX } from "react"
import "./cube.css"

type Props = {
  color: Color
}
export default function Cube({ color }: Props): JSX.Element {
  return (
    <svg
      style={{ "--color": color } as CSSProperties}
      className="cube"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 58 58"
    >
      <g>
        <polygon className="front-side" points="29, 58 3, 45 3, 13 29, 26" />
        <polygon className="right-side" points="29, 58 55, 45 55, 13 29, 26" />
        <polygon className="top-side" points="3, 13 28, 0 55, 13 29, 26" />
      </g>
    </svg>
  )
}
