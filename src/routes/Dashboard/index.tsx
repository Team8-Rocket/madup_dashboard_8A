import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import dayjs, { ManipulateType } from 'dayjs'
import { BigNumber } from 'bignumber.js'

import { useAppSelector, useAppDispatch } from 'hooks'

import AllAdsStatus from './AllAdsStatus'
import MediaAds from './MediaAds'
import { dateDifference } from 'services/allAdsStatus'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './dashboard.module.scss'
import { getEndDate, getStartDate, setEndDate, setStartDate, setFitData, setPastData } from 'states/dashboard'

import data from 'data/trend-data-set.json'
import { IItem } from 'types/dashboard'

const newData = data.report.daily.map((item) => {
  const bigNum: BigNumber = new BigNumber(item.roas).dividedBy(100).multipliedBy(item.cost)
  const sales = Math.round(bigNum.toNumber() * 100) / 100
  return { ...item, sales }
})

const Dashboard = () => {
  const startDate = useAppSelector(getStartDate)
  const endDate = useAppSelector(getEndDate)
  const minDate = new Date('2022-02-01')
  const maxDate = new Date('2022-04-20')
  const dispatch = useAppDispatch()

  useEffect(() => {
    const { pastDate, toDay } = dateDifference(1, 'month')
    dispatch(setStartDate(pastDate))
    dispatch(setEndDate(toDay))
    const fData = getFitData(pastDate, toDay)
    dispatch(setFitData(fData))
  }, [])

  const onDateChange = (dates: [Date | null, Date | null]) => {
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

  useEffect(() => {
    const fData = getFitData(new Date('2022-02-03'), new Date('2022-02-05'))
    dispatch(setFitData(fData))
    const fitDiff = getFitDifference(new Date('2022-02-03'), new Date('2022-02-05'))
    const fitPastData = getFitData(fitDiff[0], fitDiff[1])
    dispatch(setPastData(fitPastData))
  }, [startDate, endDate])

  return (
    <section className={styles.appWrapper}>
      <header>
        <h1>대시보드 or 광고관리</h1>
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
