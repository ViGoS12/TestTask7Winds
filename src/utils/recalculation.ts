export function recalculation(parentID: number | null, storage: RowData[]) {
  const rows = [...storage]
  const changedRows: RowData[] = []

  if (parentID == null) return changedRows
  let currentParentIndex = rows.findIndex((v) => v.id === parentID)
  if (currentParentIndex === -1) return changedRows
  let currentParent = rows[currentParentIndex]

  do {
    const children = rows.filter((v) => v.parent == currentParent.id)
    const newPrice = children.reduce((acc, v) => acc + v.price, 0)
    if (currentParent.price === newPrice) break

    rows[currentParentIndex].price = newPrice
    changedRows.push(rows[currentParentIndex])

    currentParentIndex = rows.findIndex((v) => v.id === currentParent.parent)
  } while (currentParentIndex !== -1)

  return changedRows
}
