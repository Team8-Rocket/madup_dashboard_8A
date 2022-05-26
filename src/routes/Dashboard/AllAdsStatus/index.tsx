import Period from './Period'
import AllStatusChart from './AllStatusChart'

import styles from './allAdsStatus.module.scss'

const Integrated = () => {
  return (
    <div className={styles.container}>
      <h2>통합 광고 현황</h2>
      <div className={styles.contents}>
        <Period />
        <AllStatusChart />
      </div>
    </div>
  )
}

export default Integrated
