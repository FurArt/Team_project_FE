import React from "react"
import { createRoot } from "react-dom/client"

import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./features/styles/index.scss"
import { HashRouter as Router } from "react-router-dom"
import { LanguageProvider } from "./features/language/LanguageContext"
import "./features/language/i18n";

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <LanguageProvider>

            <App />
          </LanguageProvider>
        </Provider>
      </Router>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
