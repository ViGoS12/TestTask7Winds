import React from 'react'
import ReactDOM from 'react-dom/client'

import './scss/index.scss'
import App from './App'

import { ThemeProvider } from '@mui/material/'
import { theme } from './styles/theme'

import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  // {/* </React.StrictMode> */}
)
