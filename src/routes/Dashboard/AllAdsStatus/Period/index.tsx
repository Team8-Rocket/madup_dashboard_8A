import { useMemo, useState } from 'react'
import { BigNumber } from 'bignumber.js'

import { useAppSelector } from 'hooks'

import data from 'data/trend-data-set.json'
import styles from './periodPerformance.module.scss'

import dayjs from 'dayjs'

import { cx } from 'styles'
import { usePeriodItems, getValues, unitProcessedPeriodItems } from 'services/allAdsStatus'
import { TriangleDown } from 'assets/svgs'
import { getFitData } from 'states/dashboard'

const PeriodPerformance = () => {
  const fitData = useAppSelector(getFitData)
  const [differenceDay, setDifferenceDay] = useState(3)
  const titleFormat = ['ROAS', '광고비', '노출수', '클릭수', '전환수', '매출']
  const unitFormat = ['%', '원', '회', '회', '회', '원']

  const { calculatedCurrent, periodItem } = usePeriodItems(differenceDay)
  // const { calculatedCurrent, periodItem } = useSelectedItems()

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
