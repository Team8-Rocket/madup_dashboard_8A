import styles from './userOption.module.scss'

const UserOption = () => {
  return (
    <section className={styles.userOptionWrapper}>
      <ul>
        <li>알림</li>
        <li>설정</li>
        <li>원티드님</li>
      </ul>
    </section>
  )
}

export default UserOption
