import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import styles from './Line.module.scss'

interface ILineProps {
  level: number
  row: RowData
}

const Line: React.FC<ILineProps> = ({ level, row }) => {
  const { rowData } = useSelector((state: RootState) => state.table)

  const getParentIndex = (parent: RowData['parent']): number => {
    return rowData.findIndex((v) => v.id === parent && v.type === 'level')
  }

  const getRowIndex = (id: RowData['id']): number => {
    return rowData.findIndex((v) => v.id === id)
  }

  const lineCount =
    getRowIndex(row.id) -
    (getParentIndex(row.parent) === -1 ? 0 : getParentIndex(row.parent))

  return (
    <div
      className={styles.lines__line}
      style={{
        marginLeft: 20 * level,
        bottom: 30,
        height: 60 * lineCount,
      }}></div>
  )
}

export default Line
