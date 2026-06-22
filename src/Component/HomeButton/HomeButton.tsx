import { JSX } from "react"
import { Link } from "react-router"

import "./home-button.css"

export default function HomeButton(): JSX.Element {
  return (
    <Link to="/" className="home-button">
      🏠
    </Link>
  )
}
