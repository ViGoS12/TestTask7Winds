import {
  TableHead,
  TableContainer,
  Table,
  TableRow,
  TableBody,
} from '@mui/material/'

import { HeaderTableCell } from './../../styles/shared'

import EditRow from './../editRow/'
import MyTableRow from '../myTableRow'

import { useState } from 'react'

import { editOneRow, setNewRow } from '../../redux/slices/tableSlice'
import { useDispatch } from 'react-redux'

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

  return (
    <TableContainer sx={{ height: '100vh' }}>
      <form>
        <Table
          aria-label='table'
          stickyHeader
          sx={{
            pl: 1,
            pr: 1,
            '&& .MuiTableCell-body': {
              color: 'white',
              borderBottom: '1px solid #414144',
              paddingTop: 0,
              paddingBottom: 0,
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
              <HeaderTableCell width='6.5%'>Уровень</HeaderTableCell>
              <HeaderTableCell width='46%'>Наименование работ</HeaderTableCell>
              <HeaderTableCell width='12.5%'>Ед. изм.</HeaderTableCell>
              <HeaderTableCell width='12%'>Количество</HeaderTableCell>
              <HeaderTableCell width='12%'>Цена за ед.</HeaderTableCell>
              <HeaderTableCell>Стоимость</HeaderTableCell>
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
