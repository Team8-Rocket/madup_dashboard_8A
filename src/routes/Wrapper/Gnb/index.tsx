import cx from 'classnames'
import styles from './gnb.module.scss'
import { NavLink } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown'
import { AdvertiseIcon, DashboardIcon, GuideIcon, LeverBi } from '../../../assets/svgs'

const Gnb = () => {
  return (
    <div className={styles.gnbWrapper}>
      <section>
        <LeverBi />
      </section>
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
      <section>
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
      </section>
    </div>
  )
}
export default Gnb
