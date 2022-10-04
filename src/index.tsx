import React from 'react'
import ReactDOM from 'react-dom/client'

import './scss/index.scss'
import App from './App'

import { ThemeProvider } from '@mui/material/'
import { theme } from './styles/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
