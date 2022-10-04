import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#27272A',
    },
    secondary: {
      main: '#a1a1aa',
    },
    divider: '#414144',
  },
  //for the future
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})
