import { Outlet } from 'react-router-dom'
import Gnb from './Gnb'
import UserOption from './UserOption'
import styles from './wrapper.module.scss'

const Wrapper = () => {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.header}>
        <Gnb />
      </aside>
      <main className={styles.content}>
        <UserOption />
        <Outlet />
      </main>
    </div>
  )
}

export default Wrapper
