import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { saveRow } from '../../utils/saveRow'
import { editRow } from './../../utils/editRow'

interface ITableSlice {
  rowData: RowData[]
  sortedRowData: RowData[]
}

const initialState: ITableSlice = {
  rowData: [],
  sortedRowData: [],
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setNewRow(state, action: PayloadAction<NewRowData>) {
      saveRow(action.payload, state.rowData)
    },
    editOneRow(state, action: PayloadAction<RowData>) {
      editRow(action.payload, state.rowData)
    },
    setSortedRowData(state, action: PayloadAction<RowData[]>) {
      const insert = (arr: RowData[], index: number, newItem: RowData) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index),
      ]
      action.payload.forEach((item) => {
        if (item.type === 'level') {
          state.sortedRowData = [...state.sortedRowData, item]
        } else {
          const index = state.sortedRowData.findIndex(
            (_item) => _item.id === item.parent
          )
          if (index !== -1) {
            state.sortedRowData = insert(state.sortedRowData, index + 1, item)
          } else {
            state.sortedRowData = insert(state.sortedRowData, 1, item)
          }
        }
      })
    },
  },
})

export const { setNewRow, editOneRow, setSortedRowData } = tableSlice.actions

export default tableSlice.reducer
