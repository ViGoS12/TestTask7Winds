import {
  TableHead,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material/'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'
import calcIcon from '../../assets/svg/calcIcon.svg'

import { useState } from 'react'

import { editOneRow, setNewRow } from '../../redux/slices/tableSlice'
import { useDispatch } from 'react-redux'

import EditRow from './../editRow/'

interface IMyTableProps {
  tableData: RowData[]
}

const MyTable: React.FC<IMyTableProps> = ({ tableData }) => {
  const dispatch = useDispatch()

  const [rowIdForEdit, setRowIdForEdit] = useState<RowData['id'] | null>(null)

  const [onCreation, setOnCreation] = useState(false)
  const selectRowIdForEdit = (id: RowData['id']) => {
    setRowIdForEdit(id)
  }

  const editRow = (row: RowData) => {
    dispatch(editOneRow(row))
    setRowIdForEdit(null)
  }

  const addNewRow = (row: RowData) => {
    dispatch(setNewRow(row))
    setOnCreation(false)
  }

  const createRow = (
    id: RowData['id'],
    parent: RowData['parent'],
    type: RowData['type']
  ) => {
    const parentIndex = tableData.findIndex((v) => v.id === id)
    console.log(id, parent, type, parentIndex)
  }

  console.log(tableData)

  return (
    <TableContainer sx={{ height: '100vh' }}>
      <form>
        <Table
          aria-label='table'
          stickyHeader
          sx={{
            pl: 2,
            pr: 2,
            '&& .MuiTableCell-body': {
              color: 'white',
              borderBottom: '1px solid #414144',
            },
            '&& .MuiTableCell-head': {
              p: '11px',
              color: '#A1A1AA',
              backgroundColor: '#202124',
              borderBottom: '1px solid #414144',
            },
          }}>
          <TableHead>
            <TableRow>
              <TableCell>Уровень</TableCell>
              <TableCell>Наименование работ</TableCell>
              <TableCell>Ед.Изм.</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Цена за ед.</TableCell>
              <TableCell>Стоимость</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!tableData.length ? (
              <EditRow mode='create' rowFunc={addNewRow} />
            ) : (
              tableData.map((row) => {
                if (row.id === rowIdForEdit) {
                  return (
                    <EditRow
                      key={row.id}
                      id={row.id}
                      parent={row.parent}
                      rowFunc={editRow}
                      editRow={row}
                      mode='edit'
                    />
                  )
                }

                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      position: 'relative',
                    }}>
                    <TableCell
                      sx={{
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
                              onClick={() =>
                                createRow(row.id, row.parent, 'level')
                              }
                            />
                            <img
                              src={calcIcon}
                              alt=''
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                createRow(row.id, row.parent, 'row')
                              }
                            />
                          </Box>
                        ) : (
                          <Box>
                            <img src={firstLevelIcon} alt='' />
                            <img
                              src={secondLevelIcon}
                              alt=''
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                createRow(row.id, row.parent, 'level')
                              }
                            />
                            <img
                              src={calcIcon}
                              alt=''
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                createRow(row.id, row.parent, 'row')
                              }
                            />
                          </Box>
                        )
                      ) : (
                        <img
                          src={calcIcon}
                          alt=''
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                    </TableCell>
                    <TableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
                      {row.title}
                    </TableCell>
                    <TableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
                      {row.unit}
                    </TableCell>
                    <TableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
                      {row.quantity}
                    </TableCell>
                    <TableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
                      {row.unitPrice}
                    </TableCell>
                    <TableCell onDoubleClick={() => selectRowIdForEdit(row.id)}>
                      {row.price}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
            {onCreation && (
              <EditRow rowFunc={addNewRow} mode='create' parent={null} />
            )}
          </TableBody>
        </Table>
      </form>
    </TableContainer>
  )
}

export default MyTable
