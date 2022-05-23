import styles from './dashboard.module.scss'

const Dashboard = () => {
  return (
    <main className={styles.appWrapper}>
      <header>
        <h1>대시보드 or 광고관리</h1>
        <p>날짜 or x</p>
      </header>
      <section>
        <div>통합 광고 현황 컴포넌트</div>
        <div>매체 현황 컴포넌트</div>
      </section>
    </main>
  )
}

export default Dashboard
