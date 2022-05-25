import cx from 'classnames'
import styles from './gnb.module.scss'
<<<<<<< HEAD:src/components/Gnb/index.tsx
import { NavLink } from 'react-router-dom'

const Gnb = () => {
  return (
    <div>
      <div className={styles.gnbWrapper}>
        <h1>head</h1>
        <nav>
=======
import { NavLink, Outlet } from 'react-router-dom'
import { LeverBi, DashboardIcon, AdvertiseIcon, GuideIcon } from '../../../assets/svgs'
import Dropdown from '../../Dropdown'

const Gnb = () => {
  return (
    <div className={styles.gnbWrapper}>
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
>>>>>>> develop:src/components/Wrapper/Gnb/index.tsx
          <ul>
            <li>
              <NavLink to='' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                <DashboardIcon />
                <h5>대시보드</h5>
              </NavLink>
            </li>
            <li>
              <NavLink to='advertise' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                <AdvertiseIcon />
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
    </div>
  )
}
export default Gnb