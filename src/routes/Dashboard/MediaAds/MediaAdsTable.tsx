import { useEffect, useState } from 'react'
import { IMediaAds, TableData } from '../../../types/mediaAds.d'
import styles from './mediaAds.module.scss'

// import CHART_STYLE from './chartStyle'
import MEDIA_DATA from './mediaChannelData.json'

const startDate = new Date('2022-02-09')
const endDate = new Date('2022-02-15')

// const startDate = '2022-02-09'

const MediaAdsTable = () => {
  const [tableData, setTableData] = useState<TableData | undefined>(undefined)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    const totalData: TableData = {
      facebook: { channel: '페이스북', cost: 0, sales: 0, roas: 0, imp: 0, click: 0, ctr: 0, cpc: 0 },
      naver: { channel: '네이버', cost: 0, sales: 0, roas: 0, imp: 0, click: 0, ctr: 0, cpc: 0 },
      google: { channel: '구글', cost: 0, sales: 0, roas: 0, imp: 0, click: 0, ctr: 0, cpc: 0 },
      kakao: { channel: '카카오', cost: 0, sales: 0, roas: 0, imp: 0, click: 0, ctr: 0, cpc: 0 },
    }

    // const totalData: ITableData[] = [
    //   { channel: 'facebook', cost: 0, sales: 0, roas: 0, imp: 0, click: 0, ctr: 0, cpc: 0 },
    //   { channel: 'naver', cost: 0, sales: 0, roas: 0, imp: 0, click: 0, ctr: 0, cpc: 0 },
    //   { channel: 'google', cost: 0, sales: 0, roas: 0, imp: 0, click: 0, ctr: 0, cpc: 0 },
    //   { channel: 'kakao', cost: 0, sales: 0, roas: 0, imp: 0, click: 0, ctr: 0, cpc: 0 },
    // ]

    const dateFilter = MEDIA_DATA.filter(
      (itemddd) =>
        startDate.getTime() <= new Date(itemddd.date).getTime() && endDate.getTime() >= new Date(itemddd.date).getTime()
    )
    dateFilter.map((item) => {
      totalData[item.channel]!.cost += item.cost
      totalData[item.channel]!.sales += Math.floor((item.roas / 100) * item.cost)
      totalData[item.channel]!.roas += item.roas
      totalData[item.channel]!.imp += item.imp
      totalData[item.channel]!.click += item.click
      // totalData[item.channel]!.ctr += item.ctr
      // totalData[item.channel]!.cpc += item.cpc
    })

    Object.values(totalData).map((entrie, idx) => {
      entrie.cpc = Math.floor(entrie.cost / entrie.click)
      entrie.ctr = (entrie.click / entrie.imp) * 100
    })

    setTableData(totalData)
  }

  // const test = () => {
  //   Object.values(tableData.naver).map((entrie, idx) => {
  //     console.log(entrie, idx)
  //   })
  // }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.title}> </th>
            <th className={styles.title}>광고비</th>
            <th className={styles.title}>매출</th>
            <th className={styles.title}>ROAS</th>
            <th className={styles.title}>노출수</th>
            <th className={styles.title}>클릭수</th>
            <th className={styles.title}>클릭률(CTR)</th>
            <th className={styles.title}>클릭당비용(CPC)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {tableData && Object.values(tableData.facebook).map((entrie, i) => <td key={`facebook${i}`}>{entrie}</td>)}
          </tr>
          <tr>{tableData && Object.values(tableData.naver).map((entrie, i) => <td key={`naver${i}`}>{entrie}</td>)}</tr>
          <tr>
            {tableData && Object.values(tableData.google).map((entrie, i) => <td key={`google${i}`}>{entrie}</td>)}
          </tr>
          <tr>{tableData && Object.values(tableData.kakao).map((entrie, i) => <td key={`kakao${i}`}>{entrie}</td>)}</tr>
        </tbody>
      </table>
    </div>
  )
}

export default MediaAdsTable
