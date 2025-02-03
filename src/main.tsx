import React from "react"
import { createRoot } from "react-dom/client"

import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./features/styles/index.scss"
// import { BrowserRouter } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Router basename="/Team_project_FE/">
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
