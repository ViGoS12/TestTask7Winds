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
      const insert = (arr: RowData[], index: number, newItem: RowData) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index),
      ]
      const array: RowData[] = [...state.rowData]
      const row = saveRow(action.payload, array).current

      const index = state.rowData.findIndex((_item) => _item.id === row.parent)

      state.rowData = insert(state.rowData, index + 1, row)
    },
    editOneRow(state, action: PayloadAction<RowData>) {
      editRow(action.payload, state.rowData)
    },
  },
})

export const { setNewRow, editOneRow } = tableSlice.actions

export default tableSlice.reducer
