import { useEffect, useState } from 'react'
import { ChartData, IChartData, IMediaAds } from '../../../types/mediaAds.d'
import styles from './mediaAds.module.scss'
import MediaAdsChart from './MediaAdsChart'
import MediaAdsChartCopy from './MediaAdsChartCopy'
import MediaAdsTable from './MediaAdsTable'
import MEDIA_DATA from './mediaChannelData.json'

const startDate = new Date('2022-03-12')
const endDate = new Date('2022-03-13')

const MediaAds = () => {
  const [dateFilterData, setDatefilterData] = useState<IMediaAds[] | undefined>(undefined)

  useEffect(() => {
    const dateFilter = MEDIA_DATA.filter(
      (itemddd) =>
        startDate.getTime() <= new Date(itemddd.date).getTime() && endDate.getTime() >= new Date(itemddd.date).getTime()
    )

    setDatefilterData(dateFilter)
  }, [])
  return (
    <div className={styles.mediaAdsWrap}>
      <h2 className={styles.title}>매체현황</h2>
      <div className={styles.content}>
        {/* <MediaAdsChart /> */}

        {dateFilterData && <MediaAdsChartCopy dateFilterData={dateFilterData} />}
        {dateFilterData && <MediaAdsTable dateFilterData={dateFilterData} />}
      </div>
    </div>
  )
}

export default MediaAds
