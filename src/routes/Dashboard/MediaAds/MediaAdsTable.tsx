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

  const changeKorea = (channel: string) => {
    switch (channel) {
      case 'facebook':
        return '페이스북'
      case 'naver':
        return '네이버'
      case 'google':
        return '구글'
      case 'kakao':
        return '카카오'
      default:
        return '총합'
    }
  }

  const calcTotal = (channel?: string) => {
    const channelData = (channel && dateFilterData.filter((data) => data.channel === channel)) || dateFilterData
    const newArr = { channel: '', cost: 0, imp: 0, click: 0, roas: 0 }

    channelData.map((item, i) => {
      newArr.channel = changeKorea(item.channel)
      newArr.cost += item.cost
      newArr.imp += item.imp
      newArr.click += item.click
      newArr.roas += item.roas
    })

    newArr.roas /= channelData.length

    return newArr
  }
  useEffect(() => {
    setTableData([calcTotal('facebook'), calcTotal('naver'), calcTotal('google'), calcTotal('kakao')])
    setChannelTotalData(calcTotal())
  }, [])

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
          {tableData.map((channelData) => (
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
          <tr className={styles.totalData}>
            <td className={styles.mediaDataChannel}>총합</td>
            <td className={styles.mediaData}>{channelTotalData.cost}원</td>
            <td className={styles.mediaData}>{Math.floor((channelTotalData.roas / 100) * channelTotalData.cost)}원</td>
            <td className={styles.mediaData}>{(channelTotalData.roas / 4).toFixed(2)}%</td>
            <td className={styles.mediaData}>{channelTotalData.imp}</td>
            <td className={styles.mediaData}>{channelTotalData.click}</td>
            <td className={styles.mediaData}>{((channelTotalData.click / channelTotalData.imp) * 100).toFixed(2)}%</td>
            <td className={styles.mediaData}>{Math.floor(channelTotalData.cost / channelTotalData.click)}원</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MediaAdsTable
