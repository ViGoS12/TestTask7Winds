import {
  TableHead,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material/'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'

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

  const seleectRowIdForEdit = (id: RowData['id']) => {
    setRowIdForEdit(id)
  }

  const editRow = (row: RowData) => {
    dispatch(editOneRow(row))
    setRowIdForEdit(null)
  }

  const addNewRow = (row: RowData) => {
    dispatch(setNewRow(row))
  }

  const createLevel = (type: RowData['type'], parent: RowData['parent']) => {
    dispatch(
      setNewRow({
        title: '',
        unit: '',
        quantity: 0,
        unitPrice: 0,
        price: 0,
        type: type,
        parent: parent,
      })
    )
    return <EditRow rowFunc={editRow} type={type} parent={parent} mode='edit' />
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
                  <TableRow key={row.id}>
                    <TableCell>
                      <img
                        src={row.parent ? secondLevelIcon : firstLevelIcon}
                        alt=''
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          createLevel('level', row.parent ? row.parent + 1 : 1)
                        }
                      />
                    </TableCell>
                    <TableCell
                      onDoubleClick={() => seleectRowIdForEdit(row.id)}>
                      {row.title}
                    </TableCell>
                    <TableCell
                      onDoubleClick={() => seleectRowIdForEdit(row.id)}>
                      {row.unit}
                    </TableCell>
                    <TableCell
                      onDoubleClick={() => seleectRowIdForEdit(row.id)}>
                      {row.quantity}
                    </TableCell>
                    <TableCell
                      onDoubleClick={() => seleectRowIdForEdit(row.id)}>
                      {row.unitPrice}
                    </TableCell>
                    <TableCell
                      onDoubleClick={() => seleectRowIdForEdit(row.id)}>
                      {row.price}
                    </TableCell>
                  </TableRow>
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
