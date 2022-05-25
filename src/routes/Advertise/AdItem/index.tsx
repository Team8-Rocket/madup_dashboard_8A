import { memo } from 'react'
import { IAdList } from 'types/adItem'

import styles from './adItem.module.scss'

const AdItem = ({ adItem }: IAdList) => {
  const slideStartDate = adItem.startDate.slice(0, 10)
  const sliceEndDate = adItem.endDate?.slice(0, 10)

  const changeTextStatus = adItem.status === 'active' ? '진행중' : '중단됨'
  const changeTextTitle = adItem.adType === 'web' ? `웹광고_${adItem.title}` : `앱광고_${adItem.title}`
  const checkEndDate = adItem.status === 'ended' ? `${slideStartDate} (${sliceEndDate})` : slideStartDate

  const handleChangeValue = (value: number) => {
    const number = value / 10000
    if (number >= 100) return `${Math.floor(number).toLocaleString()}만원`
    if (number >= 10 && String(number).length === 2) return `${number}만원`
    if (number >= 10 && String(number).length > 2) {
      const numberToString = String(number)
      const output = [numberToString.slice(0, 2), '만', ' ', numberToString.slice(3, -1), '천원'].join('')
      return output
    }
    return `${Math.floor(number * 10)}천원`
  }

  return (
    <div className={styles.adItem}>
      <table>
        <caption>{changeTextTitle}</caption>
        <tbody>
          <tr>
            <th>상태</th>
            <td>{changeTextStatus}</td>
          </tr>
          <tr>
            <th>광고 생성일</th>
            <td>{checkEndDate}</td>
          </tr>
          <tr>
            <th>일 희망 예산</th>
            <td>{handleChangeValue(adItem.budget)}</td>
          </tr>
          <tr>
            <th>광고 수익률</th>
            <td>{adItem.report.roas}%</td>
          </tr>
          <tr>
            <th>매출</th>
            <td>{handleChangeValue(adItem.report.convValue)}</td>
          </tr>
          <tr>
            <th>광고 비용</th>
            <td>{handleChangeValue(adItem.report.cost)}</td>
          </tr>
        </tbody>
      </table>
      <button type='button'>수정하기</button>
    </div>
  )
}

export default memo(AdItem)
