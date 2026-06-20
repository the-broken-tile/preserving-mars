import { Color } from "@/Model"
import { CSSProperties, JSX } from "react"
import "./cube.css"

type Props = {
  color: Color
}
export default function Cube({ color }: Props): JSX.Element {
  return (
    <div
      className="cube"
      style={
        { "--main-color": color, "--color-bg-primary": color } as CSSProperties
      }
    >
      <div></div>
    </div>
  )
}
