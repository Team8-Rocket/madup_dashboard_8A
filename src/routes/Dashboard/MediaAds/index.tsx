import { useEffect, useState } from 'react'
import { IMediaAds } from '../../../types/mediaAds.d'
import styles from './mediaAds.module.scss'
import MediaAdsChart from './MediaAdsChart'
import MediaAdsTable from './MediaAdsTable'
import MEDIA_DATA from './mediaChannelData.json'
import { useAppSelector } from 'hooks'
import dayjs from 'dayjs'

// import { getEndDate, getStartDate } from 'states/dashboard'

// const startDate = new Date('2022-03-19')
// const endDate = new Date('2022-03-19')

const MediaAds = () => {
  // const startDate = useAppSelector(getStartDate)
  // const endDate = useAppSelector(getEndDate)
  const startDate = useAppSelector((state) => state.dashboard.startDate)
  const endDate = useAppSelector((state) => state.dashboard.endDate)
  const [dateFilterData, setDatefilterData] = useState<IMediaAds[] | undefined>(undefined)

  useEffect(() => {
    if (!startDate || !endDate) return
    const dateFilter = MEDIA_DATA.filter(
      (itemddd) =>
        dayjs(startDate).format('YYYY-MM-DD') <= itemddd.date && dayjs(endDate).format('YYYY-MM-DD') >= itemddd.date
    )
    setDatefilterData(dateFilter)
  }, [startDate, endDate])

  return (
    <div className={styles.mediaAdsWrap}>
      <h2 className={styles.title}>매체현황</h2>
      <div className={styles.content}>
        {dateFilterData && <MediaAdsChart dateFilterData={dateFilterData} />}
        {dateFilterData && <MediaAdsTable dateFilterData={dateFilterData} />}
      </div>
    </div>
  )
}

export default MediaAds
