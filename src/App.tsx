import { Box, Stack } from '@mui/material'

import Header from './components/header'
import Main from './components/main'
import SideBar from './components/sidebar'

function App() {
  return (
    <Box>
      <Header />
      <Stack direction='row'>
        <SideBar />
        <Main />
      </Stack>
    </Box>
  )
}

export default App
