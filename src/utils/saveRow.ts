import { recalculation } from './recalculation'

// функция для сохранения строки
export function saveRow(rowData: NewRowData, storage: RowData[]) {
  const index = Math.max(...storage.map((v) => v.id), 0) + 1
  const row: RowData = { id: index, ...rowData }

  storage.push(row)
  return {
    current: row,
    changed: recalculation(row.parent, storage),
  }
}
