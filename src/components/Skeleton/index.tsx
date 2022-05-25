import styles from './skeleton.module.scss'

interface ISkeleton {
  pathname?: string
}

const Skeleton = ({ pathname }: ISkeleton) => {
  return pathname === '/' ? (
    <div className={styles.skeleton}>
      <div className={styles.header} />
      <div className={styles.contentWrapper}>
        <div className={styles.smallHeader} />
        <div className={styles.content} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.smallHeader} />
        <div className={styles.content} />
      </div>
      <div />
    </div>
  ) : (
    <div className={styles.skeleton}>
      <div className={styles.header} />
      <div className={styles.contentWrapper}>
        <div className={styles.content} />
      </div>
      <div />
    </div>
  )
}
export default Skeleton
