declare module '*.scss' {
  const content: { [key: string]: any }
  export = content
}

declare module '*.svg' {
  const content: any
  export default content
}

interface NewRowData {
  title: string // Наименование работ
  unit: string // Ед. изм.
  quantity: number // Количество
  unitPrice: number // Цена за ед.
  price: number // Стоимость

  parent: number | null // id уровня, в котором находится (либо null для первого уровня)
  type: 'level' | 'row'
}

interface RowData extends NewRowData {
  id: number
}
