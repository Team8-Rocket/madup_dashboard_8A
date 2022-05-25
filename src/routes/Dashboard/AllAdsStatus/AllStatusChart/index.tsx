/* eslint-disable dot-notation */
import { useState, useEffect, MouseEvent } from 'react'
import dayjs, { ManipulateType } from 'dayjs'
import { dateDifference, useWeekItems, plusItems } from 'services/allAdsStatus'
import StatusChart from './statusChart'

import { ArrowDown } from 'assets/svgs'

import data from 'data/trend-data-set.json'
import AdItem from 'routes/Advertise/AdItem/AdItem'
import styles from './allStatusChart.module.scss'
import { useAppSelector } from 'hooks'
import { IItem, IItemResult } from 'types/dashboard'

const AllStatusChart = () => {
  const onClick = (num: number, str: ManipulateType | undefined = 'day') => {
    const { pastDate, toDay } = dateDifference(num, str)
  }
  const fitNowData = useAppSelector((state) => state.dashboard.fitNowData)

  console.log('useWeekItems', useWeekItems(fitNowData))

  const [dailyItem, setDailyItem] = useState([])

  const tag: string = 'roas'
  const tag2: string = 'cost'

  const roas = fitNowData.map((item) => {
    return { x: item.date, y: item.roas }
  })
  const cost = fitNowData.map((item) => {
    return { x: item.date, y: item.cost }
  })
  const imp = fitNowData.map((item) => {
    return { x: item.date, y: item.imp }
  })
  const click = fitNowData.map((item) => {
    return { x: item.date, y: item.click }
  })
  const conv = fitNowData.map((item) => {
    return { x: item.date, y: item.conv }
  })
  const sales = fitNowData.map((item) => {
    return { x: item.date, y: item.sales }
  })

  const tagItems = {
    roas,
    cost,
    imp,
    click,
    conv,
    sales,
  }[tag]

  const tagItems2 = {
    roas,
    cost,
    imp,
    click,
    conv,
    sales,
  }[tag2]

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.optionWrapper}>
        <button type='button' onClick={() => onClick(7)}>
          일간
        </button>
        <button type='button' onClick={() => onClick(1, 'month')}>
          주간
        </button>
      </div>
      <div className={styles.chart}>
        <StatusChart data={[roas, cost]} />
      </div>
    </div>
  )
}

export default AllStatusChart
