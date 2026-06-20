import { HashRouter, Route, Routes } from "react-router"
import { JSX, StrictMode } from "react"
import { NewLegacyView, LegacyView } from "../View"
import "./styles.css"
import { ListLegacyView } from "@/View"

export default function App(): JSX.Element {
  return (
    <StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" Component={ListLegacyView} />
          <Route path="/new" Component={NewLegacyView} />
          <Route path="/legacy/:id" Component={LegacyView} />
        </Routes>
      </HashRouter>
    </StrictMode>
  )
}
