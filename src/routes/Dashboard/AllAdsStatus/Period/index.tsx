import { useMemo, useState } from 'react'
import { BigNumber } from 'bignumber.js'

import data from 'data/trend-data-set.json'
import styles from './periodPerformance.module.scss'

import { cx } from 'styles'
import { usePeriodItems, getValues, unitProcessedPeriodItems } from 'services/allAdsStatus'
import { TriangleDown } from 'assets'

const newData = data.report.daily.map((item) => {
  const bigNum: BigNumber = new BigNumber(item.roas).dividedBy(100).multipliedBy(item.cost)
  const sales = Math.round(bigNum.toNumber() * 100) / 100
  return { ...item, sales }
})

const PeriodPerformance = () => {
  const titleFormat = ['ROAS', '광고비', '노출수', '클릭수', '전환수', '매출']
  const unitFormat = ['%', '원', '회', '회', '회', '원']

  const day = 3
  const { calculatedCurrent, periodItem } = usePeriodItems(newData, day)

  const currentValues = getValues(calculatedCurrent)
  const differenceValues = getValues(periodItem)

  const currentItems = unitProcessedPeriodItems(currentValues)
  const differenceItems = unitProcessedPeriodItems(differenceValues)

  const period = useMemo(() => {
    return (
      <ul className={styles.container}>
        {titleFormat.map((item: string, index: number) => {
          const isPositive = differenceValues[index] > 0
          return (
            <li key={titleFormat[index]} className={styles.contents}>
              <span>{titleFormat[index]}</span>
              <div className={styles.periodText}>
                <p>
                  {currentItems[index]} {unitFormat[index]}
                </p>
                <div>
                  <TriangleDown className={cx(styles.arrow, { [styles.arrowUp]: isPositive })} />
                  <span>
                    {differenceItems[index]} {unitFormat[index]}
                  </span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }, [data])

  return <section className={styles.periodSection}>{period}</section>
}

export default PeriodPerformance
