import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { saveRow } from '../../utils/saveRow'
import { editRow } from './../../utils/editRow'

interface ITableSlice {
  rowData: RowData[]
}

const initialState: ITableSlice = {
  rowData: [],
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
  },
})

export const { setNewRow, editOneRow } = tableSlice.actions

export default tableSlice.reducer
