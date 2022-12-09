import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from "react-router-dom"
import { SnackbarProvider } from "notistack"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider autoHideDuration={5000}>
          <App/>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
