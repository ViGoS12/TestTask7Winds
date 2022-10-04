import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Avatar,
  styled,
  Divider,
} from '@mui/material'
import { Apps, Reply, KeyboardArrowDown } from '@mui/icons-material/'
import { MENUITEM } from '../../constants'

const MyToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  height: '44px',
})

const UserBox = styled(Box)({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
})

const Header: React.FC = () => {
  return (
    <AppBar elevation={0} position='sticky'>
      <MyToolbar variant='dense'>
        <Box>
          <IconButton edge='start' color='secondary' sx={{ mr: 1 }}>
            <Apps />
          </IconButton>
          <IconButton size='small' color='secondary'>
            <Reply />
          </IconButton>
        </Box>
        <UserBox>
          <Avatar
            src='/assets/svg/avatar.svg'
            sx={{ height: '28px', width: '28px' }}
          />
          <Typography>Антон Петров</Typography>

          <KeyboardArrowDown />
        </UserBox>
        {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {MENUITEM.map((page) => (
            <MenuItem key={page}>
              <Typography
                textAlign='center'
                sx={{
                  borderBottom: 2,
                  borderBottomColor: 'white',
                }}>
                {page}
              </Typography>
            </MenuItem>
          ))}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: 'none',
              md: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
            },
          }}>
          
          
        </Box> */}
      </MyToolbar>
      <Divider />
    </AppBar>
  )
}

export default Header
