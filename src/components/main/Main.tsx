import { Box, Divider, styled, Typography } from '@mui/material/'
import MyTable from '../myTable'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const HeaderProject = styled(Box)({
  backgroundColor: '#27272A',
  display: 'flex',
  color: 'white',
})

const Main: React.FC = () => {
  const dispatch = useDispatch()

  const { rowData } = useSelector((state: RootState) => state.table)

  return (
    <Box bgcolor='#202124' flex={5}>
      <HeaderProject>
        <Typography sx={{ m: 1.5, lineHeight: '21px', fontSize: '18px' }}>
          Строительно-монтажные работы
        </Typography>
        <Divider orientation='vertical' flexItem />
      </HeaderProject>

      <Divider />

      <MyTable tableData={rowData} />
    </Box>
  )
}

export default Main
