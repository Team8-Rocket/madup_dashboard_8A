import { Outlet } from 'react-router-dom'
import Gnb from 'components/Gnb'
import UserOption from 'components/UserOption'
import styles from './wrapper.module.scss'

const Wrapper = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Gnb />
      </header>
      <main className={styles.content}>
        <UserOption />
        <Outlet />
      </main>
    </div>
  )
}

export default Wrapper
