import { useState, useEffect, MouseEvent } from 'react'
import dayjs, { ManipulateType } from 'dayjs'
import { dateDifference, useWeekItems } from 'services/allAdsStatus'
import StatusChart from './statusChart'

import { ArrowDown } from 'assets/svgs'

import data from 'data/trend-data-set.json'
import AdItem from 'routes/Advertise/AdItem/AdItem'
import styles from './allStatusChart.module.scss'
import { useAppSelector } from 'hooks'

const AllStatusChart = () => {
  const onClick = (num: number, str: ManipulateType | undefined = 'day') => {
    const { pastDate, toDay } = dateDifference(num, str)
  }

  const fitNowData = useAppSelector((state) => state.dashboard.fitNowData)

  console.log('fitNowData', fitNowData)
  console.log(useWeekItems(fitNowData))

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.optionWrapper}>
        <button type='button' onClick={() => onClick(7)}>
          일간
        </button>
        <button type='button' onClick={() => onClick(1, 'month')}>
          월간
        </button>
        <button type='button' onClick={() => onClick(2, 'month')}>
          주간
        </button>
      </div>
      <div className={styles.chart}>
        <StatusChart />
      </div>
    </div>
  )
}

export default AllStatusChart
