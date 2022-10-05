import { Dashboard } from '@mui/icons-material'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from '@mui/material'

import { PRODJECTS } from '../../constants'
import { useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material/'

const NameProject = styled(Box)({
  backgroundColor: '#27272A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#A1A1AA',
  margin: '8px',
})

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
        <NameProject>
          <Box sx={{ ml: '10px' }}>
            <Typography sx={{ lineHeight: '16px', fontSize: '14px' }}>
              Название проекта
            </Typography>
            <Typography sx={{ lineHeight: '12px', fontSize: '10px' }}>
              Аббревиатура
            </Typography>
          </Box>
          <KeyboardArrowDown sx={{ color: 'white' }} />
        </NameProject>
        <Divider orientation='horizontal' flexItem />

        <List
          component='nav'
          sx={{ '&& .Mui-selected': { bgcolor: '#A1A1AA' } }}>
          {PRODJECTS.map((project, i) => (
            <ListItem disablePadding key={project.fullname}>
              <ListItemButton
                sx={{ height: '32px', gap: '1rem', color: 'white' }}
                selected={selectedIndex === i}
                onClick={() => setSelectedIndex(i)}>
                <Dashboard />
                <ListItemText primary={project.name} />
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
