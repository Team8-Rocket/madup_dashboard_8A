import { useEffect, useState } from 'react'
import { ChartData, IChartData } from '../../../types/mediaAds.d'
import styles from './mediaAds.module.scss'
import MediaAdsChart from './MediaAdsChart'
import MediaAdsTable from './MediaAdsTable'
import MEDIA_DATA from './mediaChannelData.json'

const startDate = new Date('2022-02-09')
const endDate = new Date('2022-02-09')

const dataStructure = [
  { value: 0, category: '광고비' },
  { value: 0, category: '매출' },
  { value: 0, category: '노출 수' },
  { value: 0, category: '클릭 수' },
  { value: 0, category: '전환 수' },
]

const init = {
  facebook: [...dataStructure],
  google: [...dataStructure],
  kakao: [...dataStructure],
  naver: [...dataStructure],
}

const getData = () => {
  const data: ChartData = {
    google: [...dataStructure],
    facebook: [...dataStructure],
    naver: [...dataStructure],
    kakao: [...dataStructure],
  }
  const dateFilter = MEDIA_DATA.filter(
    (itemddd) =>
      startDate.getTime() <= new Date(itemddd.date).getTime() && endDate.getTime() >= new Date(itemddd.date).getTime()
  )

  dateFilter.forEach((detaObj) => {
    data[detaObj.channel].find((item) => item.category === '광고비')!.value += detaObj.cost
    data[detaObj.channel].find((item) => item.category === '매출')!.value += detaObj.roas
    data[detaObj.channel].find((item) => item.category === '노출 수')!.value += detaObj.imp
    data[detaObj.channel].find((item) => item.category === '클릭 수')!.value += detaObj.ctr
    data[detaObj.channel].find((item) => item.category === '전환 수')!.value += detaObj.cvr
  })

  return data
}
const MediaAds = () => {
  const [chartData, setChartData] = useState<ChartData>(init)

  useEffect(() => {
    const data = getData()
    setChartData(data)
  }, [startDate, endDate])

  return (
    <div className={styles.mediaAdsWrap}>
      <h2 className={styles.title}>매체현황</h2>
      <div className={styles.content}>
        <MediaAdsChart chartData={chartData} />
        <MediaAdsTable />
      </div>
    </div>
  )
}

export default MediaAds
