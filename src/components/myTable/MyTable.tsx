import {
  TableHead,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from '@mui/material/'

import { useState } from 'react'

import { editOneRow, setNewRow } from '../../redux/slices/tableSlice'
import { useDispatch } from 'react-redux'

import EditRow from './../editRow/'
import MyTableRow from '../myTableRow'

interface IMyTableProps {
  tableData: RowData[]
}

const MyTable: React.FC<IMyTableProps> = ({ tableData }) => {
  const dispatch = useDispatch()

  const [rowIdForEdit, setRowIdForEdit] = useState<RowData['id'] | null>(null)

  const selectRowIdForEdit = (id: RowData['id']) => {
    setRowIdForEdit(id)
  }

  const editRow = (row: RowData) => {
    dispatch(editOneRow(row))
    setRowIdForEdit(null)
  }

  const addNewRow = (row: NewRowData) => {
    dispatch(setNewRow(row))
  }

  const MyTableCell = styled(TableCell)({
    lineHeight: '130%',
    fontSize: '14px',
  })

  console.log('table', tableData)
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
              <MyTableCell width={120}>Уровень</MyTableCell>
              <MyTableCell width={738}>Наименование работ</MyTableCell>
              <MyTableCell>Ед.Изм.</MyTableCell>
              <MyTableCell>Количество</MyTableCell>
              <MyTableCell>Цена за ед.</MyTableCell>
              <MyTableCell>Стоимость</MyTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!tableData.length ? (
              <EditRow rowFunc={addNewRow} type={'level'} />
            ) : (
              tableData.map((row) => {
                if (row.id === rowIdForEdit) {
                  return (
                    <EditRow
                      key={row.id}
                      id={row.id}
                      type={row.type}
                      parent={row.parent}
                      rowFunc={editRow}
                      editRow={row}
                    />
                  )
                }
                return (
                  <MyTableRow
                    key={row.id}
                    row={row}
                    selectRowIdForEdit={selectRowIdForEdit}
                    rowFunc={addNewRow}
                  />
                )
              })
            )}
          </TableBody>
        </Table>
      </form>
    </TableContainer>
  )
}

export default MyTable
