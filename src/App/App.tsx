import { HashRouter, Route, Routes } from "react-router"
import { JSX, StrictMode } from "react"
import {
  ImportLegacyView,
  LegacyView,
  ListLegacyView,
  NewLegacyView,
} from "@/View"
import { HomeButton } from "@/Component"
import { BodyClassNameProvider } from "@/Context"
import "./styles.css"

export default function App(): JSX.Element {
  return (
    <StrictMode>
      <BodyClassNameProvider>
        <HashRouter>
          <HomeButton />
          <Routes>
            <Route path="/" Component={ListLegacyView} />
            <Route path="/new" Component={NewLegacyView} />
            <Route path="/import/:encoded" Component={ImportLegacyView} />
            <Route path="/legacy/:id" Component={LegacyView} />
          </Routes>
        </HashRouter>
      </BodyClassNameProvider>
    </StrictMode>
  )
}
