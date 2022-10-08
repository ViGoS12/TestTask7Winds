import {
  TableHead,
  TableContainer,
  Table as MuiTable,
  TableRow as MuiTableRow,
  TableBody,
} from '@mui/material/'

import { HeaderTableCell } from '../../styles/shared'

import EditRow from '../editRow'
import TableRow from '../tableRow'

import { useState } from 'react'

import { editOneRow, setNewRow } from '../../redux/slices/tableSlice'
import { useDispatch } from 'react-redux'
import { getLevel } from '../../utils/getLevel'

interface ITableProps {
  tableData: RowData[]
}

const Table: React.FC<ITableProps> = ({ tableData }) => {
  const dispatch = useDispatch()

  const [rowIdForEdit, setRowIdForEdit] = useState<RowData['id'] | null>(null)
  const [level, setLevel] = useState(0)

  const setRowLevel = (parent: RowData['parent']) => {
    setLevel(getLevel(parent, tableData))
  }

  const selectRowIdForEdit = (id: RowData['id'], el: string) => {
    if (el.length !== 0) {
      setRowIdForEdit(id)
    }
  }

  const editRow = (row: RowData) => {
    dispatch(editOneRow(row))
    setRowIdForEdit(null)
  }

  const addNewRow = (row: NewRowData) => {
    dispatch(setNewRow(row))
  }

  const getRowLevel = (parent: RowData['parent']) => {
    return getLevel(parent, tableData)
  }

  return (
    <TableContainer sx={{ height: '100vh' }}>
      <form>
        <MuiTable
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
            <MuiTableRow>
              <HeaderTableCell width='6.5%'>Уровень</HeaderTableCell>
              <HeaderTableCell width='46%'>Наименование работ</HeaderTableCell>
              <HeaderTableCell width='12.5%'>Ед. изм.</HeaderTableCell>
              <HeaderTableCell width='12%'>Количество</HeaderTableCell>
              <HeaderTableCell width='12%'>Цена за ед.</HeaderTableCell>
              <HeaderTableCell>Стоимость</HeaderTableCell>
            </MuiTableRow>
          </TableHead>
          <TableBody>
            {!tableData.length ? (
              <EditRow
                rowFunc={addNewRow}
                type={'level'}
                setRowLevel={setRowLevel}
                level={level}
              />
            ) : (
              tableData.map((row, i) => {
                if (row.id === rowIdForEdit) {
                  return (
                    <EditRow
                      key={row.id}
                      id={row.id}
                      type={row.type}
                      parent={row.parent}
                      rowFunc={editRow}
                      editRow={row}
                      setRowLevel={setRowLevel}
                      level={level}
                    />
                  )
                }
                return (
                  <TableRow
                    rowIndex={i}
                    key={row.id}
                    row={row}
                    selectRowIdForEdit={selectRowIdForEdit}
                    rowFunc={addNewRow}
                    getRowLevel={getRowLevel}
                  />
                )
              })
            )}
          </TableBody>
        </MuiTable>
      </form>
    </TableContainer>
  )
}

export default Table
