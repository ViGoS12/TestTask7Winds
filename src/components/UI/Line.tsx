import styles from './Line.module.scss'

interface ILineProps {
  level: number
}

const Line: React.FC<ILineProps> = ({ level }) => {
  console.log(Array(level).fill(null))
  return (
    <>
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
    </>
  )
}

export default Line
