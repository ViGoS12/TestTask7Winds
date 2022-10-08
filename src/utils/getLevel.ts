export const getLevel: any = (
  parent: RowData['parent'],
  storage: RowData[],
  level = 0
) => {
  if (parent === null) {
    return level
  }

  const parentIndex = storage.findIndex((v) => v.id === parent)

  if (parentIndex === -1) return level + 1
  const parentRow = storage[parentIndex]

  if (parentRow.parent !== null) {
    return getLevel(parentRow.parent, storage, level + 1)
  }
  return level + 1
}
