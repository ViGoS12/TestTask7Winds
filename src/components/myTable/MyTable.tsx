import {
  TableHead,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Divider,
  styled,
} from '@mui/material/'

import firstLevelIcon from '../../assets/svg/firstLevelIcon.svg'
import secondLevelIcon from '../../assets/svg/secondLevelIcon.svg'

const rowData: RowData[] = [
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: 1,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: 1,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: 1,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: 1,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: 1,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: 1,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
  {
    id: 1,
    title: 'Южная строительная площадка',
    unit: 'K',
    quantity: 0,
    unitPrice: 0,
    price: 1209122.5,
    parent: null,
    type: 'level',
  },
]

const MyTable = () => {
  return (
    <TableContainer sx={{ height: '100vh' }}>
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
          {rowData.map((row) => (
            <TableRow key={row.id + Math.random()}>
              <TableCell>
                {row.parent ? (
                  <img src={secondLevelIcon} alt='' />
                ) : (
                  <img src={firstLevelIcon} alt='' />
                )}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.unitPrice}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MyTable
