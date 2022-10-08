import styles from './Line.module.scss'

interface ILineProps {
  level: number
}

const Line: React.FC<ILineProps> = ({ level }) => {
  return (
    <div className={styles.lines}>
      {Array(level)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className={styles.lines__line}
            style={{
              marginLeft: 20 * (index + 1),
            }}></div>
        ))}
    </div>
  )
}

export default Line
