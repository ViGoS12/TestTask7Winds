import { TableRow, Box, Typography } from '@mui/material/'

import { RowTableCell, RowTextField } from '../../styles/shared'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'
import calcIcon from '../../assets/svg/calcIcon.svg'

import { useEffect, useState } from 'react'

import { DEFAULT_ROW } from '../../constants'

interface IEditRowProps {
  id?: RowData['id']
  parent?: RowData['parent']
  type: NewRowData['type']
  rowFunc: (row: RowData) => void
  editRow?: RowData
  setRowLevel: (parent: RowData['parent']) => void
  level: number
}
const EditRow: React.FC<IEditRowProps> = ({
  id,
  parent = null,
  type,
  rowFunc,
  setRowLevel,
  level,
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

  useEffect(() => {
    setRowLevel(parent)
  }, [])

  const isDisibled = row.type === 'level'

  return (
    <TableRow sx={{ position: 'relative' }}>
      <RowTableCell
        sx={{
          position: 'relative',
          paddingLeft: level <= 1 ? 0 : level * 2 - 1.3,
          '&:before': {
            content: '""',
            position: 'absolute',
            bottom: '30px',
            left: level > 1 ? level * 20 : 20,
            width: level ? '15px' : 0,
            borderBottom: '1px solid #C6C6C6',
            borderLeft: '1px solid #C6C6C6',
            height: level ? '60px' : 0,
          },
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
          <Box sx={{ marginLeft: '30px' }}>
            <img src={calcIcon} alt='' />
          </Box>
        )}
      </RowTableCell>
      <RowTableCell>
        <RowTextField
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
          <RowTextField
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
          <RowTextField
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
          <RowTextField
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
        <Typography>{String(row.quantity * row.unitPrice)}</Typography>
      </RowTableCell>
    </TableRow>
  )
}

export default EditRow
