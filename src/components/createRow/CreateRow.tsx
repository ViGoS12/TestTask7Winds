import { TableRow, TableCell, TextField, Typography, Box } from '@mui/material/'

import { RowTableCell } from '../../styles/shared'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'
import calcIcon from '../../assets/svg/calcIcon.svg'

import { useState } from 'react'

interface IEditRowProps {
  parent: NewRowData['parent']
  type: NewRowData['type']
  rowFunc: (row: NewRowData) => void
  setOnCreation: (bool: boolean) => void
}

const EditRow: React.FC<IEditRowProps> = ({
  parent,
  type,
  rowFunc,
  setOnCreation,
}) => {
  const DEFAULT_ROW = {
    title: '',
    unit: '',
    quantity: 0,
    unitPrice: 0,
    price: 0,
    parent: parent,
    type: type,
  }
  const [row, setRow] = useState<NewRowData>(DEFAULT_ROW)

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name') as keyof NewRowData
    const fieldValue = event.target.value

    const newRowData = { ...row, [fieldName]: fieldValue }
    setRow(newRowData)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (row.price !== row.unitPrice * row.quantity) {
        row.price = row.unitPrice * row.quantity
      }
      rowFunc(row)
      setOnCreation(false)
    }
  }

  const isDisibled = row.type === 'level'

  return (
    <TableRow>
      <RowTableCell sx={{ paddingLeft: row.parent ? row.parent * 1.5 : 0 }}>
        {type === 'level' ? (
          parent === null ? (
            <Box sx={{ marginLeft: 1 }}>
              <img src={firstLevelIcon} alt='' />
            </Box>
          ) : (
            <Box
              sx={{
                marginLeft: '30px',
              }}>
              <img src={secondLevelIcon} alt='' />
            </Box>
          )
        ) : (
          <Box sx={{ paddingLeft: '38px' }}>
            <img src={calcIcon} alt='' />
          </Box>
        )}
      </RowTableCell>
      <TableCell>
        <TextField
          fullWidth
          name='title'
          size='small'
          value={row?.title}
          onKeyDown={onKeyDown}
          onChange={onChangeInput}
        />
      </TableCell>
      <RowTableCell>
        {row.type === 'row' && (
          <TextField
            fullWidth
            name='unit'
            size='small'
            disabled={isDisibled}
            value={row?.unit}
            onKeyDown={onKeyDown}
            onChange={onChangeInput}
          />
        )}
      </RowTableCell>
      <TableCell>
        {row.type === 'row' && (
          <TextField
            fullWidth
            name='quantity'
            size='small'
            type='number'
            disabled={isDisibled}
            value={row?.quantity}
            onKeyDown={onKeyDown}
            onChange={onChangeInput}
          />
        )}
      </TableCell>
      <RowTableCell>
        {row.type === 'row' && (
          <TextField
            fullWidth
            name='unitPrice'
            size='small'
            disabled={isDisibled}
            value={row?.unitPrice}
            type='number'
            onKeyDown={onKeyDown}
            onChange={onChangeInput}
          />
        )}
      </RowTableCell>
      <RowTableCell>
        {row.type === 'level' ? (
          <Typography>{row.price}</Typography>
        ) : (
          <TextField
            fullWidth
            name='price'
            size='small'
            disabled
            value={row.quantity * row.unitPrice}
            onKeyDown={onKeyDown}
            onChange={onChangeInput}
          />
        )}
      </RowTableCell>
    </TableRow>
  )
}

export default EditRow
