import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  styled,
  Divider,
  Tab,
  Tabs,
} from '@mui/material'
import { Apps, Reply, KeyboardArrowDown } from '@mui/icons-material/'

import { MENUITEM } from '../../constants'

import { useState } from 'react'

const MyToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  height: '44px',
  paddingRight: 0,
})

const UserBox = styled(Box)({
  display: 'flex',
  gap: '5px',
  alignItems: 'center',
})

const Header: React.FC = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    setValue(newValue)
  }

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    }
  }

  return (
    <>
      <AppBar
        elevation={0}
        position='sticky'
        sx={{
          height: '44px',
          '&& .MuiToolbar-root': {
            paddingRight: 0,
          },
        }}>
        <MyToolbar variant='dense'>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <IconButton edge='start' color='secondary' sx={{ mr: 1 }}>
              <Apps />
            </IconButton>
            <IconButton size='small' color='secondary'>
              <Reply />
            </IconButton>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor='inherit'
              indicatorColor='primary'>
              {MENUITEM.map((page, i) => (
                <Tab
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    fontSize: '14px',
                  }}
                  key={page}
                  label={page}
                  {...a11yProps(i)}
                />
              ))}
            </Tabs>
          </Box>

          <UserBox>
            <Avatar
              src='/assets/svg/avatar.svg'
              sx={{ height: '28px', width: '28px' }}
            />
            <Typography sx={{ lineHeight: '16px' }}>Антон Петров</Typography>

            <KeyboardArrowDown />
          </UserBox>
        </MyToolbar>
      </AppBar>
      <Divider />
    </>
  )
}

export default Header
