import { Box, Divider, styled, Typography } from '@mui/material/'
import MyTable from '../myTable'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setSortedRowData } from '../../redux/slices/tableSlice'

const HeaderProject = styled(Box)({
  backgroundColor: '#27272A',
  display: 'flex',
  color: 'white',
})

const Main: React.FC = () => {
  const dispatch = useDispatch()
  const { rowData, sortedRowData } = useSelector(
    (state: RootState) => state.table
  )
  useEffect(() => {
    dispatch(setSortedRowData(rowData))
  }, [rowData])

  return (
    <Box bgcolor='#202124' flex={5}>
      <HeaderProject>
        <Typography sx={{ m: 1.5, lineHeight: '21px', fontSize: '18px' }}>
          Строительно-монтажные работы
        </Typography>
        <Divider orientation='vertical' flexItem />
      </HeaderProject>

      <Divider />

      <MyTable tableData={sortedRowData} />
    </Box>
  )
}

export default Main
