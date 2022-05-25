import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import dayjs, { ManipulateType } from 'dayjs'
import { BigNumber } from 'bignumber.js'

import { useAppSelector, useAppDispatch } from 'hooks'
import { ArrowDown } from 'assets/svgs'

import AllAdsStatus from './AllAdsStatus'
import MediaAds from './MediaAds'
import { dateDifference, useSelectedDayItems } from 'services/allAdsStatus'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './dashboard.module.scss'
import {
  getEndDate,
  getStartDate,
  setEndDate,
  setStartDate,
  setFitNowData,
  setPastData,
  getFitNowData,
  getPastData,
  getData,
} from 'states/dashboard'

import data from 'data/trend-data-set.json'
import { IItem } from 'types/dashboard'

const Dashboard = () => {
  const startDate = useAppSelector((state) => state.dashboard.startDate)
  const endDate = useAppSelector((state) => state.dashboard.endDate)
  const newData = useAppSelector((state) => state.dashboard.data)
  const pastData = useAppSelector(getPastData)
  const fitData = useAppSelector(getFitNowData)
  const minDate = new Date('2022-02-01')
  const maxDate = new Date('2022-04-20')
  const dispatch = useAppDispatch()
  const [isClick, setIsClick] = useState(false)

  useEffect(() => {
    const { pastDate, toDay } = dateDifference(7, 'day')
    dispatch(setStartDate(pastDate))
    dispatch(setEndDate(toDay))
    const fData = getFitData(pastDate, toDay)
    dispatch(setFitNowData(fData))
  }, [])

  useEffect(() => {
    const fData = getFitData(startDate, endDate)
    dispatch(setFitNowData(fData))
    const fitDiff = getFitDifference(startDate, endDate)
    const fitPastData = getFitData(fitDiff[0], fitDiff[1])
    dispatch(setPastData(fitPastData))
  }, [startDate, endDate])

  const onDateChange = (dates: [Date, Date]) => {
    const [start, end] = dates
    dispatch(setStartDate(start))
    dispatch(setEndDate(end))
  }

  const getFitData = (startDay: Date, endDay: Date) => {
    const resultDateData = newData.filter((item: IItem) => {
      return item.date >= dayjs(startDay).format('YYYY-MM-DD') && item.date <= dayjs(endDay).format('YYYY-MM-DD')
    })
    return resultDateData
  }
  const getFitDifference = (start: Date, end: Date) => {
    const dateStart = dayjs(start)
    const dateEnd = dayjs(end)
    const diff = dateEnd.diff(dateStart, 'day')
    const past = dateStart.subtract(diff + 1, 'day')
    const last = past.add(diff, 'day')
    return [new Date(past.format()), new Date(last.format())]
  }

  return (
    <section className={styles.appWrapper}>
      <header className={styles.dataPickerWrap}>
        <h1 className={styles.datePickerTitle}>대시보드</h1>
        <div className={styles.customDatePicker}>
          <DatePicker
            selected={startDate}
            onChange={onDateChange}
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            // highlightDates={[minDate, maxDate]}
            dateFormat='yyyy년 MM월 dd일'
            selectsRange
            monthsShown={2}
          />
          <ArrowDown />
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
