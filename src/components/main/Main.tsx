import { Box, Divider, styled, Typography } from '@mui/material/'
import MyTable from '../myTable'

const HeaderProject = styled(Box)({
  backgroundColor: '#27272A',
  display: 'flex',
  color: 'white',
})

const Main: React.FC = () => {
  return (
    <Box bgcolor='#202124' flex={5}>
      <HeaderProject>
        <Typography sx={{ m: 1.5, lineHeight: '21px', fontSize: '18px' }}>
          Строительно-монтажные работы
        </Typography>
        <Divider orientation='vertical' flexItem />
      </HeaderProject>

      <Divider />

      <MyTable />
    </Box>
  )
}

export default Main
