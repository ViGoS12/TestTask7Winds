import { TableRow as MuiTableRow, Box } from '@mui/material/'
import { RowTableCell } from '../../styles/shared'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'
import calcIcon from '../../assets/svg/calcIcon.svg'

import CreateRow from '../createRow'

import { useState, useEffect } from 'react'
import Line from '../UI/Line'

interface ITableRowProps {
  row: RowData
  selectRowIdForEdit: (id: RowData['id'], el: string) => void
  rowFunc: (row: NewRowData) => void
  getRowLevel: (parent: RowData['parent']) => number
}

const TableRow: React.FC<ITableRowProps> = ({
  row,
  selectRowIdForEdit,
  rowFunc,
  getRowLevel,
}) => {
  const [onCreation, setOnCreation] = useState(false)
  const [level, setLevel] = useState(0)
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

  useEffect(() => {
    setLevel(getRowLevel(row.parent))
  }, [])

  return (
    <>
      <MuiTableRow sx={{ position: 'relative' }}>
        <RowTableCell
          sx={{
            position: 'relative',
            paddingLeft: level <= 1 ? 0 : level * 2 - 1.3,
            // '&:before': {
            //   content: '""',
            //   position: 'absolute',
            //   bottom: '30px',
            //   left: level > 1 ? level * 20 : 20,
            //   width: level ? '15px' : 0,
            //   borderBottom: '1px solid #C6C6C6',
            // },
          }}>
          {/* <Line level={level} /> */}
          {row.type === 'level' ? (
            row.parent !== null ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
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
                  style={{ cursor: 'pointer', zIndex: 1, position: 'relative' }}
                  onClick={() => createRow('level')}
                />
                {isHovering && (
                  <img
                    src={calcIcon}
                    alt=''
                    style={{
                      zIndex: 1,
                      cursor: 'pointer',
                      position: 'relative',
                    }}
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
                <img
                  src={firstLevelIcon}
                  alt=''
                  style={{ zIndex: 1, position: 'relative' }}
                />

                {isHovering && (
                  <>
                    <img
                      src={secondLevelIcon}
                      alt=''
                      style={{
                        cursor: 'pointer',
                        zIndex: 1,
                        position: 'relative',
                      }}
                      onClick={() => createRow('level')}
                    />
                    <img
                      src={calcIcon}
                      alt=''
                      style={{
                        cursor: 'pointer',
                        zIndex: 1,
                        position: 'relative',
                      }}
                      onClick={() => createRow('row')}
                    />
                  </>
                )}
              </Box>
            )
          ) : (
            <Box sx={{ marginLeft: '30px' }}>
              <img
                src={calcIcon}
                style={{ zIndex: 1, position: 'relative' }}
                alt=''
              />
            </Box>
          )}
        </RowTableCell>
        <RowTableCell
          onDoubleClick={() => selectRowIdForEdit(row.id, row.title)}>
          {row.title}
        </RowTableCell>
        <RowTableCell
          onDoubleClick={() => selectRowIdForEdit(row.id, row.unit)}>
          {row.type === 'row' && row.unit}
        </RowTableCell>
        <RowTableCell
          onDoubleClick={() =>
            selectRowIdForEdit(
              row.id,
              row.type === 'row' ? String(row.quantity) : ''
            )
          }>
          {row.type === 'row' && divideNumber(replaceDot(row.quantity))}
        </RowTableCell>
        <RowTableCell
          onDoubleClick={() =>
            selectRowIdForEdit(
              row.id,
              row.type === 'row' ? String(row.unitPrice) : ''
            )
          }>
          {row.type === 'row' && divideNumber(replaceDot(row.unitPrice))}
        </RowTableCell>
        <RowTableCell
          onDoubleClick={() => selectRowIdForEdit(row.id, String(row.price))}>
          {divideNumber(replaceDot(row.price))}
        </RowTableCell>
      </MuiTableRow>
      {onCreation && (
        <CreateRow
          type={onCreationType}
          parent={row.id}
          rowFunc={rowFunc}
          setOnCreation={() => setOnCreation(false)}
          getRowLevel={getRowLevel}
        />
      )}
    </>
  )
}

export default TableRow
