import { memo } from 'react'

import { IAdList } from 'types/adItem'
import styles from './adItem.module.scss'

import { unitProcessedPeriodItems } from 'services/allAdsStatus'

const AdItem = ({ adItem }: IAdList) => {
  const slideStartDate = adItem.startDate.slice(0, 10)
  const sliceEndDate = adItem.endDate?.slice(0, 10)

  const changeTextStatus = adItem.status === 'active' ? '진행중' : '중단됨'
  const changeTextTitle = adItem.adType === 'web' ? `웹광고_${adItem.title}` : `앱광고_${adItem.title}`
  const checkEndDate = adItem.status === 'ended' ? `${slideStartDate} (${sliceEndDate})` : slideStartDate

  const handleChangeValue = (value: number) => {
    const arr = [value]
    return unitProcessedPeriodItems(arr)
  }

  return (
    <dl className={styles.adItem}>
      <div className={styles.title}>
        <dt>{changeTextTitle}</dt>
      </div>
      <div className={styles.wrapper}>
        <dt>상태</dt>
        <dd>{changeTextStatus}</dd>
      </div>
      <div className={styles.wrapper}>
        <dt>광고 생성일</dt>
        <dd>{checkEndDate}</dd>
      </div>
      <div className={styles.wrapper}>
        <dt>일 희망 예산</dt>
        <dd>{handleChangeValue(adItem.budget)}</dd>
      </div>
      <div className={styles.wrapper}>
        <dt>광고 수익률</dt>
        <dd>{adItem.report.roas}%</dd>
      </div>
      <div className={styles.wrapper}>
        <dt>매출</dt>
        <dd>{handleChangeValue(adItem.report.convValue)}</dd>
      </div>
      <div className={styles.wrapper}>
        <dt>광고 비용</dt>
        <dd>{handleChangeValue(adItem.report.cost)}</dd>
      </div>
      <div>
        <button type='button'>수정하기</button>
      </div>
    </dl>
  )
}

export default memo(AdItem)
