import { HashRouter, Route, Routes } from "react-router"
import { JSX, StrictMode } from "react"
import {
  ExportLegacyView,
  ImportLegacyView,
  LegacyView,
  ListLegacyView,
  NewLegacyView,
} from "@/View"
import "./styles.scss"

export default function App(): JSX.Element {
  return (
    <StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" Component={ListLegacyView} />
          <Route path="/new" Component={NewLegacyView} />
          <Route path="/import/:encoded" Component={ImportLegacyView} />
          <Route path="/legacy/:id" Component={LegacyView} />
          <Route path="/legacy/:id/export" Component={ExportLegacyView} />
        </Routes>
      </HashRouter>
    </StrictMode>
  )
}
