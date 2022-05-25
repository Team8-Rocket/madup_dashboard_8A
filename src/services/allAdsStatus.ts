import dayjs, { ManipulateType } from 'dayjs'
import { IItem, IItemResult } from 'types/dashboard'
import data from 'data/trend-data-set.json'
import { useAppSelector } from 'hooks'
import { getData } from 'states/dashboard'

// 기간별 n일 값 더하기
export const plusItems = (arr: IItem[]) => {
  const result = {
    roas: 0,
    cost: 0,
    imp: 0,
    click: 0,
    conv: 0,
    sales: 0,
  }
  arr?.forEach((item: IItem) => {
    result.roas += item.roas
    result.cost += item.cost
    result.imp += item.imp
    result.click += item.click
    result.conv += item.conv
    result.sales += item.sales
  })

  return result
}

// 현재 n일 - 과거 n일
export const minusItem = (current: IItemResult, past: IItemResult) => {
  const result = {
    roas: 0,
    cost: 0,
    imp: 0,
    click: 0,
    conv: 0,
    sales: 0,
  }
  result.roas = current.roas - past.roas
  // result.push(((current.sales + past.sales) / (current.cost + past.cost)) * 100)
  result.cost = current.cost - past.cost
  result.imp = current.imp - past.imp
  result.click = current.click - past.click
  result.conv = current.conv - past.conv
  result.sales = current.sales - past.sales

  return result
}

// 기간에 따른 차이 증감 결과
export const usePeriodItems = (days: number) => {
  const newData = useAppSelector(getData)
  const currentArray = newData.slice(-days)
  const pastArray = newData.slice(-days * 2, -days)

  const calculatedCurrent = plusItems(currentArray)
  const calculatedPast = plusItems(pastArray)

  const periodItem = minusItem(calculatedCurrent, calculatedPast)
  const result = { calculatedCurrent, periodItem }

  return result
}

export const useSelectedDayItems = (fitData: IItem[], fitPastData: IItem[]) => {
  const calculatedCurrent = plusItems(fitData)
  const calculatedPast = plusItems(fitPastData)

  const periodItem = minusItem(calculatedCurrent, calculatedPast)
  const result = { calculatedCurrent, periodItem }

  return result
}

// 객체에서 value만 추출
export const getValues = (obj: object) => {
  return Object.values(obj)
}

// 숫자 단위 변환
export const unitProcessedPeriodItems = (arr: number[]) => {
  const unitWords = ['', '만', '억', '조', '경']
  return arr.map((item: number) => {
    const absItem = Math.abs(item)
    const itemLength = String(absItem).split('.')[0].length - 1
    const remain = itemLength % 4
    const share = Math.floor(itemLength / 4)
    if (share === 0) return Math.floor(absItem).toLocaleString() + unitWords[share]
    const forOneSpotItem = String(absItem).slice(0, -share * 4 + 1)
    if (remain === 0) return `${forOneSpotItem[0]}.${forOneSpotItem[1]}${unitWords[share]}`
    return Math.floor(absItem / 10000 ** share).toLocaleString() + unitWords[share]
  })
}

export const dateDifference = (num: number, str: ManipulateType | undefined = 'day') => {
  const date = dayjs('2022-04-20')
  const past = date.subtract(num, str)
  const stringDate = date.format()
  const stringPast = past.format()
  return { pastDate: new Date(stringPast), toDay: new Date(stringDate) }
}
