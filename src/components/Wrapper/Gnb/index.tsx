import styles from './gnb.module.scss'
import { NavLink, Outlet } from 'react-router-dom'

const Gnb = () => {
  return (
    <div>
      <div className={styles.gnbWrapper}>
        <header>head</header>
        <nav>
          <ul>
            <li>
              <NavLink to=''>대시보드</NavLink>
            </li>
            <li>
              <NavLink to='advertise'>광고관리</NavLink>
            </li>
          </ul>
        </nav>
        <footer>이용 가이드</footer>
      </div>
    </div>
  )
}
export default Gnb
