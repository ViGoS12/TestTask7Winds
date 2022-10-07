import { TableRow, TextField, Box, Typography } from '@mui/material/'

import { RowTableCell } from '../../styles/shared'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'
import calcIcon from '../../assets/svg/calcIcon.svg'

import { useState } from 'react'

import { DEFAULT_ROW } from '../../constants'

interface IEditRowProps {
  id?: RowData['id']
  parent?: RowData['parent']
  type: NewRowData['type']
  rowFunc: (row: RowData) => void
  editRow?: RowData
}
const EditRow: React.FC<IEditRowProps> = ({
  id,
  parent = null,
  type,
  rowFunc,
  ...props
}) => {
  const [row, setRow] = useState<RowData>(
    props.editRow ? props.editRow : DEFAULT_ROW
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name') as keyof RowData
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
    }
  }

  const isDisibled = row.type === 'level'

  return (
    <TableRow>
      <RowTableCell
        sx={{
          paddingLeft: row.parent ? row.parent * 1.5 : 0,
        }}>
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
      <RowTableCell>
        <TextField
          size='small'
          fullWidth
          name='title'
          value={row?.title}
          onKeyDown={onKeyDown}
          onChange={onChangeInput}
        />
      </RowTableCell>
      <RowTableCell>
        {row.type === 'row' && (
          <TextField
            size='small'
            fullWidth
            name='unit'
            disabled={isDisibled}
            value={row?.unit}
            onKeyDown={onKeyDown}
            onChange={onChangeInput}
          />
        )}
      </RowTableCell>
      <RowTableCell>
        {row.type === 'row' && (
          <TextField
            size='small'
            fullWidth
            name='quantity'
            disabled={isDisibled}
            value={row?.quantity}
            type='number'
            onKeyDown={onKeyDown}
            onChange={onChangeInput}
          />
        )}
      </RowTableCell>
      <RowTableCell>
        {row.type === 'row' && (
          <TextField
            size='small'
            fullWidth
            name='unitPrice'
            disabled={isDisibled}
            type='number'
            value={row?.unitPrice}
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
            size='small'
            fullWidth
            name='price'
            disabled
            value={String(row.quantity * row.unitPrice)}
            onKeyDown={onKeyDown}
            onChange={onChangeInput}
          />
        )}
      </RowTableCell>
    </TableRow>
  )
}

export default EditRow
