import cx from 'classnames'
import styles from './gnb.module.scss'
import { NavLink, useParams } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown'
import { Advertise, AdvertiseSelect, Dashboard, DashboardSelect, GuideIcon, LeverBi } from '../../../assets/svgs'
import { useLocation } from 'react-use'

const Gnb = () => {
  const { pathname } = useLocation()

  return (
    <aside className={styles.gnbWrapper}>
      <header>
        <LeverBi />
      </header>
      <nav>
        <div className={styles.service}>
          <h4>서비스</h4>
          <Dropdown />
        </div>
        <div className={styles.linkList}>
          <h4>광고 센터</h4>
          <ul>
            <li>
              <NavLink to='' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                {pathname === '/' ? <DashboardSelect /> : <Dashboard />}
                <h5>대시보드</h5>
              </NavLink>
            </li>
            <li>
              <NavLink to='advertise' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                {pathname === '/advertise' ? <AdvertiseSelect /> : <Advertise />}
                <h5>광고관리</h5>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <footer>
        <div className={styles.guide}>
          <div className={styles.guideIcon}>
            <GuideIcon />
          </div>
          <div className={styles.guideContent}>
            <p>레버 이용 가이드</p>
            <span>시작하기 전에 알아보기</span>
          </div>
        </div>
        <div className={styles.agreement}>
          <p>레버는 함께 만들어갑니다.</p>
          <span>이용약관</span>
        </div>
      </footer>
    </aside>
  )
}
export default Gnb
