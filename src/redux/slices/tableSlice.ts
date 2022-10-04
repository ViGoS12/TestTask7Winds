import { createSlice } from '@reduxjs/toolkit'

interface ITableSlice {}

const initialState: ITableSlice = {}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
})

export const {} = tableSlice.actions

export default tableSlice.reducer
