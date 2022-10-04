import { configureStore } from '@reduxjs/toolkit'
import table from './slices/tableSlice'

export const store = configureStore({
  reducer: {
    table,
  },
})

export type RootState = ReturnType<typeof store.getState>
