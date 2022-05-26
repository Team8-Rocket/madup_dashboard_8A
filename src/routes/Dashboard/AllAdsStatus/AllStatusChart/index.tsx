/* eslint-disable dot-notation */
import { useState, useEffect, useMemo } from 'react'
import { getWeekItems } from 'services/allAdsStatus'
import StatusChart from './statusChart'

import DropdownTest from 'components/DropdownTest'
import DropdownTestTwo from 'components/DropdownTestTwo'

import styles from './allStatusChart.module.scss'
import { useAppSelector, useAppDispatch } from 'hooks'

import { setFirstSelect, setSecondSelect } from 'states/dashboard'

const AllStatusChart = () => {
  // const onClick = (is: boolean) => {
  //   setIsWeek(is)
  // }
  const fitNowData = useAppSelector((state) => state.dashboard.fitNowData)
  const firstSelect = useAppSelector((state) => state.dashboard.firstSelect)
  const secondSelect = useAppSelector((state) => state.dashboard.secondSelect)
  const weekSelect = useAppSelector((state) => state.dashboard.weekSelect)
  const [selectedOption, setSelectOption] = useState(firstSelect)
  const [secondSelectedOption, setSecondSelectOption] = useState(secondSelect)
  // const [isWeek, setIsWeek] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setFirstSelect(selectedOption))
    dispatch(setSecondSelect(secondSelectedOption))
  }, [selectedOption, secondSelectedOption, dispatch])

  const [firstArr, setFirstArr] = useState<string[] | undefined>()
  const [secondArr, setSecondArr] = useState<string[] | undefined>()

  const OPTIONS = useMemo(() => ['roas', 'cost', 'imp', 'click', 'conv', 'sales'], [])

  useEffect(() => {
    const first = OPTIONS.filter((item) => item !== secondSelect)
    setFirstArr(first)
    const second = OPTIONS.filter((item) => item !== firstSelect)
    setSecondArr(second)
  }, [firstSelect, secondSelect, OPTIONS])
  const settingData = weekSelect ? fitNowData : getWeekItems(fitNowData)
  const statData = {
    roas: settingData.map((item) => {
      return { x: item.date, y: item.roas }
    }),
    cost: settingData.map((item) => {
      return { x: item.date, y: item.cost }
    }),
    imp: settingData.map((item) => {
      return { x: item.date, y: item.imp }
    }),
    click: settingData.map((item) => {
      return { x: item.date, y: item.click }
    }),
    conv: settingData.map((item) => {
      return { x: item.date, y: item.conv }
    }),
    sales: settingData.map((item) => {
      return { x: item.date, y: item.sales }
    }),
  }

  const firstStatus = {
    roas: statData.roas,
    cost: statData.cost,
    imp: statData.imp,
    click: statData.click,
    conv: statData.conv,
    sales: statData.sales,
  }[firstSelect]
  if (!firstStatus) return null

  const secondStatus = {
    roas: statData.roas,
    cost: statData.cost,
    imp: statData.imp,
    click: statData.click,
    conv: statData.conv,
    sales: statData.sales,
  }[secondSelect]
  if (!secondStatus) return null

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.optionWrapper}>
        <div className={styles.dropdownWrapper}>
          <div className={styles.leftDropdown}>
            <DropdownTest isSecond={false} dataArr={firstArr} selected={firstSelect} setSelected={setSelectOption} />
            <DropdownTest isSecond dataArr={secondArr} selected={secondSelect} setSelected={setSecondSelectOption} />
          </div>
          <div className={styles.rightDropdown}>
            <DropdownTestTwo />
          </div>
        </div>
      </div>
      <div className={styles.chart}>
        <StatusChart data={[firstStatus, secondStatus]} />
      </div>
    </div>
  )
}
export default AllStatusChart
