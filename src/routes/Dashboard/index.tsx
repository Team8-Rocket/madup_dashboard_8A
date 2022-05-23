import styles from './dashboard.module.scss'
import AllAdsStatus from './AllAdsStatus'

const Dashboard = () => {
  return (
    <main className={styles.container}>
      <header>
        <h1>대시보드 or 광고관리</h1>
        <p>날짜 or x</p>
      </header>
      <section>
        <AllAdsStatus />
        <div>매체 현황 컴포넌트</div>
      </section>
    </main>
  )
}

export default Dashboard
