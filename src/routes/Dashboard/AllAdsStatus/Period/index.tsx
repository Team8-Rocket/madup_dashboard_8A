import { useMemo, useState } from 'react'
import { BigNumber } from 'bignumber.js'

import data from 'data/trend-data-set.json'

import styles from './periodPerformance.module.scss'
import { cx } from 'styles'
import { usePeriodItems, getValues, unitProcessedPeriodItems } from 'services/allAdsStatus'

const newData = data.report.daily.map((item) => {
  const bigNum: BigNumber = new BigNumber(item.roas).dividedBy(100).multipliedBy(item.cost)
  const sales = Math.round(bigNum.toNumber() * 100) / 100
  return { ...item, sales }
})

const PeriodPerformance = () => {
  const titleFormat = ['ROAS', '광고비', '노출수', '클릭수', '전환수', '매출']
  const unitFormat = ['%', '원', '회', '회', '회', '원']

  const day = 3

  const { calculatedCurrent, periodItem } = usePeriodItems(day, newData)

  const currentValues = getValues(calculatedCurrent)
  const differenceValues = getValues(periodItem)
  // const [isIncrease, setIsIncrease] = useState<Boolean>()
  const currentItems = unitProcessedPeriodItems(currentValues)
  const differenceItems = unitProcessedPeriodItems(differenceValues)

  const period = useMemo(() => {
    return (
      <ul>
        {titleFormat.map((item: string, index: number) => {
          // if (item < 0.0) {
          //   setIsIncrease(false)
          // }
          return (
            <li key={titleFormat[index]} className={styles.container}>
              <div className={styles.leftText}>
                <span>{titleFormat[index]}</span>
                <p>
                  {currentItems[index]} {unitFormat[index]}
                </p>
              </div>
              <div className={styles.rightText}>
                <span>▼</span>
                <span>
                  {differenceItems[index]} {unitFormat[index]}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }, [data])

  return <section>{period}</section>
}

export default PeriodPerformance
