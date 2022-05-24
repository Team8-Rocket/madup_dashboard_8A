import styles from './dashboard.module.scss'
import AllAdsStatus from './AllAdsStatus'
import MediaAds from './MediaAds'

const Dashboard = () => {
  return (
    // <main className={styles.container}>
    <section className={styles.appWrapper}>
      <header>
        <h1>대시보드 or 광고관리</h1>
        <p>날짜 or x</p>
      </header>
      <section>
        <AllAdsStatus />
        <MediaAds />
      </section>
    </section>
  )
}

export default Dashboard
