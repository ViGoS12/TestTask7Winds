import { TableRow, TableCell, Typography, Box } from '@mui/material/'

import { RowTableCell, RowTextField } from '../../styles/shared'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'
import calcIcon from '../../assets/svg/calcIcon.svg'

import { useState, useEffect } from 'react'

interface IEditRowProps {
  parent: NewRowData['parent']
  type: NewRowData['type']
  rowFunc: (row: NewRowData) => void
  setOnCreation: (bool: boolean) => void
  getRowLevel: (parent: RowData['parent']) => number
}

const CreateRow: React.FC<IEditRowProps> = ({
  parent,
  type,
  rowFunc,
  setOnCreation,
  getRowLevel,
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
  const [level, setLevel] = useState(0)

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name') as keyof NewRowData
    const fieldValue = event.target.value

    const newRowData = { ...row, [fieldName]: fieldValue, type }
    setRow(newRowData)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (type === 'row' && row.price !== row.unitPrice * row.quantity) {
        row.price = row.unitPrice * row.quantity
      }
      rowFunc(row)
      setOnCreation(false)
    }
  }

  useEffect(() => {
    setLevel(getRowLevel(row.parent))
  }, [])

  const isDisibled = type === 'level'

  return (
    <TableRow>
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
            height: '60px',
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
          <Box sx={{ paddingLeft: '30px' }}>
            <img src={calcIcon} alt='' />
          </Box>
        )}
      </RowTableCell>
      <TableCell>
        <RowTextField
          fullWidth
          name='title'
          size='small'
          value={row?.title}
          onKeyDown={onKeyDown}
          onChange={onChangeInput}
        />
      </TableCell>
      <RowTableCell>
        {type === 'row' && (
          <RowTextField
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
        {type === 'row' && (
          <RowTextField
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
        {type === 'row' && (
          <RowTextField
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
        <Typography>
          {type === 'row' ? String(row.quantity * row.unitPrice) : 0}
        </Typography>
      </RowTableCell>
    </TableRow>
  )
}

export default CreateRow
