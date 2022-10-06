import { TableRow, TableCell, TextField } from '@mui/material/'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'
import calcIcon from '../../assets/svg/calcIcon.svg'

import { useState } from 'react'

interface IEditRowProps {
  parent?: NewRowData['parent']
  type: NewRowData['type']
  rowFunc: (row: NewRowData) => void
  editRow?: NewRowData
  setOnCreated: (bool: boolean) => void
}

const EditRow: React.FC<IEditRowProps> = ({
  parent = null,
  type = 'level',
  rowFunc,
  setOnCreated,
  ...props
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
  const [row, setRow] = useState<NewRowData>(
    props.editRow ? props.editRow : DEFAULT_ROW
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name') as keyof NewRowData
    const fieldValue = event.target.value
    const newRowData = { ...row, [fieldName]: fieldValue }

    setRow(newRowData)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      rowFunc(row)
      setOnCreated(false)
    }
  }

  const isDisibled = row.type === 'level'

  return (
    <TableRow>
      <TableCell>
        {parent === null && type === 'level' ? (
          <img src={firstLevelIcon} alt='' />
        ) : (
          <img src={secondLevelIcon} alt='' />
        )}
        {type === 'row' && <img src={calcIcon} alt='' />}
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
