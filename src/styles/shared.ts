import { TableCell, styled, Box, TextField } from '@mui/material'

export const HeaderProject = styled(Box)({
  backgroundColor: '#27272A',
  display: 'flex',
  color: 'white',
})

export const HeaderTableCell = styled(TableCell)({
  lineHeight: '130%',
  fontSize: '14px',
  letterSpacing: '0.1px',
})

export const NameProject = styled(Box)({
  backgroundColor: '#27272A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#A1A1AA',
  margin: '8px',
})

export const RowTableCell = styled(TableCell)({
  lineHeight: '130%',
  fontSize: '14px',
  height: '60px',
})

export const RowTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    border: '1px solid #414144',
    color: '#71717A',
  },
})
