import { useMemo } from 'react'

import { useAppSelector } from 'hooks'

import styles from './periodPerformance.module.scss'

import { cx } from 'styles'
import { getValues, unitProcessedPeriodItems, useSelectedDayItems } from 'services/allAdsStatus'
import { TriangleDown } from 'assets/svgs'

const PeriodPerformance = () => {
  const pastData = useAppSelector((state) => state.dashboard.fitPastData)
  const fitData = useAppSelector((state) => state.dashboard.fitNowData)
  const titleFormat = ['ROAS', '광고비', '노출수', '클릭수', '전환수', '매출']
  const unitFormat = ['%', '원', '회', '회', '회', '원']

  const { calculatedCurrent, periodItem } = useSelectedDayItems(fitData, pastData)

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
  }, [pastData, fitData])

  return <section className={styles.periodSection}>{period}</section>
}

export default PeriodPerformance
