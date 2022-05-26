import cx from 'classnames'
import styles from './gnb.module.scss'
import { NavLink, useParams, Link } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown'
import { Advertise, AdvertiseSelect, Dashboard, DashboardSelect, GuideIcon, LeverBi } from '../../../assets/svgs'
import { useLocation } from 'react-use'

const Gnb = () => {
  const { pathname } = useLocation()

  return (
    <div className={styles.gnbWrapper}>
      <LeverBi />
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
      <div>
        <div className={styles.navBottom}>
          <div className={styles.guidWrap}>
            <div className={styles.guideIcon}>
              <GuideIcon />
            </div>
            <div className={styles.guideContent}>
              <p className={styles.gutidBigText}>레버 이용 가이드</p>
              <p>시작하기 전에 알아보기</p>
            </div>
          </div>
          <div className={styles.agreement}>
            <p>레버는 함께 만들어갑니다.</p>
            <Link className={styles.link} to=''>
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Gnb
