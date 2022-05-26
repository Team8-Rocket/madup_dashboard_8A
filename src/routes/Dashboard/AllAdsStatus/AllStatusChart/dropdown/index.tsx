import { MouseEvent, useEffect, useRef, useState } from 'react'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useAppSelector, useAppDispatch } from 'hooks'
import dayjs from 'dayjs'
import cx from 'classnames'

import { ArrowDown } from 'assets/svgs'
import styles from './dropdown.module.scss'

interface MemuTitle {
  [key: string]: string
}

const DROPDOWN_TITLE: MemuTitle = {
  roas: 'ROAS',
  cost: '광고비',
  imp: '노출수',
  click: '클릭수',
  conv: '전환수',
  convValue: '매출',
  day: '일간',
  week: '주간',
}

interface Props {
  dropdownList: string[]
  category: string
  setCategory: ActionCreatorWithPayload<string, string>
}

const Dropdonwn = ({ dropdownList, category, setCategory }: Props) => {
  const dispatch = useAppDispatch()

  const startDate = useAppSelector((state) => state.dashboard.startDate)
  const endDate = useAppSelector((state) => state.dashboard.endDate)

  const isMoreOneWeek = dayjs(endDate).diff(startDate, 'day') >= 7

  const [toggleDropdown, setToggleDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggleDropdown = () => {
    setToggleDropdown((prev) => !prev)
  }

  const handleClickDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(setCategory(e.currentTarget.value))
    setToggleDropdown(false)
  }

  const clickOutside = (e: CustomEvent<MouseEvent>) => {
    if (!dropdownRef.current?.contains(e.target as Node)) {
      setToggleDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside as EventListener)

    return () => {
      document.removeEventListener('mousedown', clickOutside as EventListener)
    }
  }, [])

  return (
    <div ref={dropdownRef}>
      <button className={styles.dropdownButton} onClick={handleToggleDropdown} type='button'>
        {DROPDOWN_TITLE[category]}
        <ArrowDown />
      </button>
      {toggleDropdown && (
        <ul className={styles.dropdownDropdown}>
          {dropdownList.map((item) => {
            return (
              <li className={styles.dropdownList} key={item}>
                <button
                  type='button'
                  className={cx({ [styles.disabled]: !isMoreOneWeek && item === 'week' })}
                  value={item}
                  onClick={handleClickDropdown}
                  disabled={!isMoreOneWeek && item === 'week'}
                >
                  {DROPDOWN_TITLE[item]}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Dropdonwn
