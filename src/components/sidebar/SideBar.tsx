import { Dashboard } from '@mui/icons-material'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { NameProject } from '../../styles/shared'
import { KeyboardArrowDown } from '@mui/icons-material/'

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
          display: { xs: 'none', sm: 'block' },
        }}>
        <NameProject>
          <Box sx={{ ml: '10px' }}>
            <Typography sx={{ lineHeight: '16px', fontSize: '14px' }}>
              Название проекта
            </Typography>
            <Typography sx={{ lineHeight: '13px', fontSize: '10px' }}>
              Аббревиатура
            </Typography>
          </Box>
          <KeyboardArrowDown sx={{ color: 'white' }} />
        </NameProject>
        <Divider orientation='horizontal' flexItem />

        <List
          component='nav'
          sx={{
            '&& .Mui-selected': { bgcolor: '#A1A1AA' },
            paddingTop: '2px',
          }}>
          {PRODJECTS.map((project, i) => (
            <ListItem disablePadding key={project.fullname}>
              <ListItemButton
                sx={{
                  display: 'flex',
                  paddingTop: '0px',
                  paddingLeft: '20px',
                  height: '32px',
                  gap: '1rem',
                  color: 'white',
                }}
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
