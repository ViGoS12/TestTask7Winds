import { TableRow, TableCell, styled, Box } from '@mui/material/'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'
import calcIcon from '../../assets/svg/calcIcon.svg'

import CreateRow from './../createRow/index'
import { useState } from 'react'

interface IMyTableRowProps {
  row: RowData
  selectRowIdForEdit: (id: RowData['id']) => void
  rowFunc: (row: NewRowData) => void
}

const MyTableCell = styled(TableCell)({
  lineHeight: '130%',
  fontSize: '14px',
})

const MyTableRow: React.FC<IMyTableRowProps> = ({
  row,
  selectRowIdForEdit,
  rowFunc,
}) => {
  const [onCreation, setOnCreation] = useState(false)
  const [onCreationType, setOnCreationType] =
    useState<NewRowData['type']>('level')

  const createRow = (type: RowData['type']) => {
    setOnCreationType(type)
    setOnCreation(true)
  }

  return (
    <>
      <TableRow
        sx={{
          position: 'relative',
        }}>
        <MyTableCell
          sx={{
            paddingLeft: row.parent ? row.parent * 3 : 0,
            '&:before': {
              content: '""',
              position: 'absolute',
              bottom: '30px',
              left: 4,
              width: '15px',
              borderBottom: '1px solid #333',
            },
          }}>
          {row.type === 'level' ? (
            row.parent !== null ? (
              <Box>
                <img
                  src={secondLevelIcon}
                  alt=''
                  style={{ cursor: 'pointer' }}
                  onClick={() => createRow('level')}
                />
                <img
                  src={calcIcon}
                  alt=''
                  style={{ cursor: 'pointer' }}
                  onClick={() => createRow('row')}
                />
              </Box>
            ) : (
              <Box>
                <img src={firstLevelIcon} alt='' />
                <img
                  src={secondLevelIcon}
                  alt=''
                  style={{ cursor: 'pointer' }}
                  onClick={() => createRow('level')}
                />
                <img
                  src={calcIcon}
                  alt=''
                  style={{ cursor: 'pointer' }}
                  onClick={() => createRow('row')}
                />
              </Box>
            )
          ) : (
            <img src={calcIcon} alt='' style={{ cursor: 'pointer' }} />
          )}
        </MyTableCell>
        <MyTableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
          {row.title}
        </MyTableCell>
        <MyTableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
          {row.unit}
        </MyTableCell>
        <MyTableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
          {row.quantity}
        </MyTableCell>
        <MyTableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
          {row.unitPrice}
        </MyTableCell>
        <MyTableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
          {row.price}
        </MyTableCell>
      </TableRow>
      {onCreation && (
        <CreateRow
          type={onCreationType}
          parent={row.id}
          rowFunc={rowFunc}
          setOnCreated={() => setOnCreation(false)}
        />
      )}
    </>
  )
}

export default MyTableRow
