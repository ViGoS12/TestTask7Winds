import { TableRow, TableCell, TextField } from '@mui/material/'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'

import { useState } from 'react'

interface IEditRowProps {
  id?: RowData['id']
  parent?: RowData['parent']
  type?: RowData['type']
  rowFunc: (row: RowData) => void
  editRow?: RowData
  mode: 'create' | 'edit'
}
const EditRow: React.FC<IEditRowProps> = ({
  id,
  parent = null,
  type = 'level',
  rowFunc,
  mode,
  ...props
}) => {
  const DEFAULT_ROW = {
    id: 0,
    title: '',
    unit: '',
    quantity: 0,
    unitPrice: 0,
    price: 0,
    parent: parent,
    type: type,
  }
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
      rowFunc(row)
    }
  }

  const isDisibled = row.type === 'level'

  return (
    <TableRow>
      <TableCell>
        {parent ? (
          <img src={secondLevelIcon} alt='' />
        ) : (
          <img src={firstLevelIcon} alt='' />
        )}
      </TableCell>
      <TableCell>
        <TextField
          name='title'
          placeholder=''
          value={row?.title}
          onKeyDown={onKeyDown}
          onChange={onChangeInput}
        />
      </TableCell>
      <TableCell>
        <TextField
          name='unit'
          placeholder=''
          disabled={isDisibled}
          value={row?.unit}
          onKeyDown={onKeyDown}
          onChange={onChangeInput}
        />
      </TableCell>
      <TableCell>
        <TextField
          name='quantity'
          placeholder=''
          disabled={isDisibled}
          value={row?.quantity}
          onKeyDown={onKeyDown}
          onChange={onChangeInput}
        />
      </TableCell>
      <TableCell>
        <TextField
          name='unitPrice'
          placeholder=''
          disabled={isDisibled}
          value={row?.unitPrice}
          onKeyDown={onKeyDown}
          onChange={onChangeInput}
        />
      </TableCell>
      <TableCell>
        <TextField
          name='price'
          placeholder=''
          disabled
          value={
            row.type === 'level' ? row.quantity * row.unitPrice : row?.price
          }
          onKeyDown={onKeyDown}
          onChange={onChangeInput}
        />
      </TableCell>
    </TableRow>
  )
}

export default EditRow
