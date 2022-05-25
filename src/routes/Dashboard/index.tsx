import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import dayjs, { ManipulateType } from 'dayjs'

import AllAdsStatus from './AllAdsStatus'
import MediaAds from './MediaAds'
import { dateDifference } from 'services/allAdsStatus'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './dashboard.module.scss'

const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  useEffect(() => {
    const { pastDate, toDay } = dateDifference(1, 'month')
    setStartDate(pastDate)
    setEndDate(toDay)
  }, [])

  const onDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    // <main className={styles.container}>
    <section className={styles.appWrapper}>
      <header>
        <h1>대시보드</h1>
        <div className={styles.customDatePicker}>
          <DatePicker
            selected={startDate}
            onChange={onDateChange}
            startDate={startDate}
            endDate={endDate}
            dateFormat='yyyy년 MM월 dd일'
            selectsRange
            monthsShown={2}
          />
        </div>
      </header>
      <section className={styles.dashboardSection}>
        <AllAdsStatus />
        <MediaAds />
      </section>
    </section>
  )
}

export default Dashboard
