import { useEffect, useState } from 'react'
import { IMediaAds, ITableData } from '../../../types/mediaAds.d'
import styles from './mediaAds.module.scss'

interface Props {
  dateFilterData: IMediaAds[]
}

const MediaAdsTable = ({ dateFilterData }: Props) => {
  const [tableData, setTableData] = useState<ITableData[] | []>([])
  const [channelTotalData, setChannelTotalData] = useState<ITableData>({
    channel: '총합',
    cost: 0,
    roas: 0,
    imp: 0,
    click: 0,
  })

  const koChannel: any = {
    facebook: '페이스북',
    naver: '네이버',
    google: '구글',
    kakao: '카카오',
  }

  const calcTotal = (channel: string) => {
    const channelData = dateFilterData.filter((data) => data.channel === channel)
    const newArr = { channel: '', cost: 0, imp: 0, click: 0, roas: 0 }
    const totaldata = { channel: '총합', cost: 0, roas: 0, imp: 0, click: 0 }

    channelData.map((item, i) => {
      newArr.channel = koChannel[item.channel]
      newArr.cost += item.cost
      newArr.imp += item.imp
      newArr.click += item.click
      newArr.roas += item.roas

      // totaldata.cost += item.cost
      // totaldata.imp += item.imp
      // totaldata.click += item.click
      // totaldata.roas += item.roas
    })
    setChannelTotalData((prev) => {
      return { ...prev, cost: prev.cost + newArr.cost }
    })
    return newArr
  }
  useEffect(() => {
    // getData()
    setTableData([calcTotal('facebook'), calcTotal('naver'), calcTotal('google'), calcTotal('kakao')])
  }, [])

  // const getData = () => {

  // }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableTitle}> </th>
            <th className={styles.tableTitle}>광고비</th>
            <th className={styles.tableTitle}>매출</th>
            <th className={styles.tableTitle}>ROAS</th>
            <th className={styles.tableTitle}>노출수</th>
            <th className={styles.tableTitle}>클릭수</th>
            <th className={styles.tableTitle}>클릭률(CTR)</th>
            <th className={styles.tableTitle}>클릭당비용(CPC)</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((channelData, i) => (
            <tr key={channelData.channel}>
              <td className={styles.mediaDataChannel}>{channelData.channel}</td>
              <td className={styles.mediaData}>{channelData.cost}원</td>
              <td className={styles.mediaData}>{Math.floor((channelData.roas / 100) * channelData.cost)}원</td>
              <td className={styles.mediaData}>{channelData.roas.toFixed(2)}%</td>
              <td className={styles.mediaData}>{channelData.imp}</td>
              <td className={styles.mediaData}>{channelData.click}</td>
              <td className={styles.mediaData}>{((channelData.click / channelData.imp) * 100).toFixed(2)}%</td>
              <td className={styles.mediaData}>{Math.floor(channelData.cost / channelData.click)}원</td>
            </tr>
          ))}
          <tr>
            <td className={styles.mediaDataChannel}>총합</td>
            <td className={styles.mediaData}>{channelTotalData.cost}원</td>
            <td className={styles.mediaData} />
            <td className={styles.mediaData} />
            <td className={styles.mediaData} />
            <td className={styles.mediaData} />
            <td className={styles.mediaData} />
            <td className={styles.mediaData} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MediaAdsTable
