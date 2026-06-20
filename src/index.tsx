import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

ReactDOM.createRoot(document.documentElement.querySelector("body")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

reportWebVitals(console.log)
