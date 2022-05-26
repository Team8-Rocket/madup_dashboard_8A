import Skeleton from 'components/Skeleton'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-use'
import Gnb from './Gnb'
import UserOption from './UserOption'
import styles from './wrapper.module.scss'

const Wrapper = () => {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [pathname])

  return (
    <div className={styles.wrapper}>
      <aside className={styles.header}>
        <Gnb />
      </aside>
      <main className={styles.content}>
        <UserOption />
        {/* <Outlet /> */}
        {loading ? <Skeleton pathname={pathname} /> : <Outlet />}
      </main>
    </div>
  )
}

export default Wrapper
