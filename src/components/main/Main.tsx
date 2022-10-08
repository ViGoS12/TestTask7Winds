import { Box, Divider, Typography } from '@mui/material/'
import { HeaderProject } from '../../styles/shared'

import Table from '../table'

import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const Main: React.FC = () => {
  const { rowData } = useSelector((state: RootState) => state.table)

  return (
    <Box bgcolor='#202124' flex={7}>
      <HeaderProject>
        <Typography sx={{ m: 1.5, lineHeight: '21px', fontSize: '18px' }}>
          Строительно-монтажные работы
        </Typography>
        <Divider orientation='vertical' flexItem />
      </HeaderProject>

      <Divider />

      <Table tableData={rowData} />
    </Box>
  )
}

export default Main
