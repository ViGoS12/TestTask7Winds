import { TableRow, Box } from '@mui/material/'
import { RowTableCell } from './../../styles/shared'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'
import calcIcon from '../../assets/svg/calcIcon.svg'

import CreateRow from './../createRow/'

import { useState } from 'react'

interface IMyTableRowProps {
  row: RowData
  selectRowIdForEdit: (id: RowData['id']) => void
  rowFunc: (row: NewRowData) => void
}

const MyTableRow: React.FC<IMyTableRowProps> = ({
  row,
  selectRowIdForEdit,
  rowFunc,
}) => {
  const [onCreation, setOnCreation] = useState(false)
  const [onCreationType, setOnCreationType] =
    useState<NewRowData['type']>('level')
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const createRow = (type: RowData['type']) => {
    setOnCreationType(type)
    setOnCreation(true)
  }

  const replaceDot = (number: number): string => {
    return String(number).replaceAll('.', ',')
  }

  const divideNumber = (stringNum: string): string => {
    return stringNum.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <>
      <TableRow>
        <RowTableCell
          sx={{
            paddingLeft: row.parent ? row.parent * 1.5 : 0,
          }}>
          {row.type === 'level' ? (
            row.parent !== null ? (
              <Box
                sx={{
                  marginLeft: '30px',
                  width: 'fit-content',
                  borderRadius: '6px',
                  backgroundColor: isHovering ? '#414144' : 'none',
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}>
                <img
                  src={secondLevelIcon}
                  alt=''
                  style={{ cursor: 'pointer' }}
                  onClick={() => createRow('level')}
                />
                {isHovering && (
                  <img
                    src={calcIcon}
                    alt=''
                    style={{ cursor: 'pointer' }}
                    onClick={() => createRow('row')}
                  />
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  marginLeft: 1,
                  width: 'fit-content',

                  borderRadius: '6px',
                  backgroundColor: isHovering ? '#414144' : 'none',
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}>
                <img src={firstLevelIcon} alt='' />

                {isHovering && (
                  <>
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
                  </>
                )}
              </Box>
            )
          ) : (
            <Box sx={{ marginLeft: '38px' }}>
              <img src={calcIcon} alt='' />
            </Box>
          )}
        </RowTableCell>
        <RowTableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
          {row.title}
        </RowTableCell>
        <RowTableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
          {row.type === 'row' && row.unit}
        </RowTableCell>
        <RowTableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
          {row.type === 'row' && divideNumber(replaceDot(row.quantity))}
        </RowTableCell>
        <RowTableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
          {row.type === 'row' && divideNumber(replaceDot(row.unitPrice))}
        </RowTableCell>
        <RowTableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
          {divideNumber(replaceDot(row.price))}
        </RowTableCell>
      </TableRow>
      {onCreation && (
        <CreateRow
          type={onCreationType}
          parent={row.id}
          rowFunc={rowFunc}
          setOnCreation={() => setOnCreation(false)}
        />
      )}
    </>
  )
}

export default MyTableRow
