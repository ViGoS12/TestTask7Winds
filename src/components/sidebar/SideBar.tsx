import { Dashboard } from '@mui/icons-material'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import { PRODJECTS } from '../../constants'
import { useState } from 'react'

const SideBar: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(4)

  return (
    <>
      <Box
        bgcolor='#27272A'
        flex={1}
        sx={{
          height: '100vh',
          display: { xs: 'none', sm: 'block' },
        }}>
        <List
          component='nav'
          sx={{ '&& .Mui-selected': { bgcolor: '#A1A1AA' } }}>
          {PRODJECTS.map((project, i) => (
            <ListItem disablePadding key={project}>
              <ListItemButton
                sx={{ height: '32px', gap: '1rem', color: 'white' }}
                selected={selectedIndex === i}
                onClick={() => setSelectedIndex(i)}>
                <Dashboard />
                <ListItemText primary={project} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider orientation='vertical' flexItem />
    </>
  )
}

export default SideBar
