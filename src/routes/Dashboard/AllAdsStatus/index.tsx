import { useMemo } from 'react'

import AllStatusChart from './AllStatusChart'
import PeriodPerformance from './Period/PeriodPerformance'
import data from '../../../config/trend-data-set.json'

import { BigNumber } from 'bignumber.js'
import styles from './allAdsStatus.module.scss'

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_HALF_UP })

const newData = data.report.daily.map((item, index) => {
  const bigNum: BigNumber = new BigNumber(item.roas).dividedBy(100).multipliedBy(item.cost)
  const sales = Math.round(bigNum.toNumber() * 100) / 100
  return { ...item, sales }
})

console.log('매출=', (data.report.daily[0].roas / 100) * data.report.daily[0].cost)
console.log(newData[0])

const Integrated = () => {
  const thickFormat = ['ROAS', '광고비', '매출', '노출수', '클릭수', '전환수']

  const usePeriodItems = (dailyKey: String) => {
    useMemo(() => {
      return (
        <ul>
          {data.report.daily.map((item, index) => {
            return <li key={item.date}>period</li>
          })}
        </ul>
      )
    }, [data])
  }

  return (
    <div className={styles.container}>
      <h1>통합 광고 현황</h1>
      <div className={styles.contents}>
        <PeriodPerformance />
        <AllStatusChart />
      </div>
    </div>
  )
}

export default Integrated
