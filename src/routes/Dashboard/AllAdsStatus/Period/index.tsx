import { useMemo, useState } from 'react'
import { BigNumber } from 'bignumber.js'

import data from 'config/trend-data-set.json'
import { IItem, IItemResult } from 'types/dashboard'

import styles from './periodPerformance.module.scss'
import { cx } from 'styles'

const newData = data.report.daily.map((item) => {
  const bigNum: BigNumber = new BigNumber(item.roas).dividedBy(100).multipliedBy(item.cost)
  const sales = Math.round(bigNum.toNumber() * 100) / 100
  return { ...item, sales }
})

const PeriodPerformance = () => {
  const thickFormat = ['ROAS', '광고비', '노출수', '클릭수', '전환수', '매출']

  const plusItems = (arr: IItem[]) => {
    const result = {
      roas: 0,
      cost: 0,
      imp: 0,
      click: 0,
      conv: 0,
      sales: 0,
    }
    arr.forEach((item: IItem) => {
      result.roas += item.roas
      result.cost += item.cost
      result.imp += item.imp
      result.click += item.click
      result.conv += item.conv
      result.sales += item.sales
    })

    return result
  }

  const minusItem = (current: IItemResult, past: IItemResult) => {
    const result: number[] = []
    result.push(current.roas - past.roas)
    // result.push(((current.sales + past.sales) / (current.cost + past.cost)) * 100)
    result.push(current.cost - past.cost)
    result.push(current.imp - past.imp)
    result.push(current.click - past.click)
    result.push(current.conv - past.conv)
    result.push(current.sales - past.sales)

    return result
  }

  const usePeriodItems = (days: number) => {
    const currentArray = newData.slice(-days)
    const pastArray = newData.slice(-days * 2, -days)

    const calculatedCurrent = plusItems(currentArray)
    const calculatedPast = plusItems(pastArray)

    const periodItem = minusItem(calculatedCurrent, calculatedPast)
    const result = { calculatedCurrent, periodItem }

    return result
  }
  const day = 3
  const { calculatedCurrent, periodItem } = usePeriodItems(day)

  const getValues = (obj: object) => {
    const result = []
    for (const [key, value] of Object.entries(obj)) {
      result.push(value)
    }
    return result
  }
  const currentItems = getValues(calculatedCurrent)

  const [isIncrease, setIsIncrease] = useState<Boolean>()

  const periodItems = useMemo(() => {
    return (
      <ul>
        {periodItem.map((item: number, index: number) => {
          if (item < 0.0) {
            setIsIncrease(false)
          }
          return (
            <li key={thickFormat[index]} className={styles.container}>
              <div className={styles.leftText}>
                <span>{thickFormat[index]}</span>
                <p>{currentItems[index]}%</p>
              </div>
              <div className={styles.rightText}>
                <span>▼</span>
                <span>{item}</span>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }, [data])

  return <section>{periodItems}</section>
}

export default PeriodPerformance
