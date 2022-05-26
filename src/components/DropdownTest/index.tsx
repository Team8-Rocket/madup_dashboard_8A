import styles from './dropdown.module.scss'
import { ArrowDown } from 'assets/svgs'
import React, { useEffect, useRef, useState, MouseEvent } from 'react'
import { cx } from 'styles'

interface Props {
  dataArr: string[] | undefined
  selected: string
  setSelected: Function
  isSecond: boolean
}

interface MemuTitle {
  [key: string]: string
}
const DROPDOWN_TITLE: MemuTitle = {
  roas: 'ROAS',
  cost: '광고비',
  imp: '노출수',
  click: '클릭수',
  conv: '전환수',
  sales: '매출',
  day: '일간',
  week: '주간',
}

const Dropdown = ({ dataArr, selected, setSelected, isSecond }: Props) => {
  const [dropdown, setDropdown] = useState(false)

  const clickOuter = useRef<HTMLDivElement>(null)

  const handleClickOutSide = (e: any) => {
    if (dropdown && !clickOuter.current?.contains(e.target)) setDropdown(false)
  }

  useEffect(() => {
    if (dropdown) document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  })

  const optionButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setSelected(event.currentTarget.value)
    setDropdown(false)
  }

  return (
    <div ref={clickOuter} className={styles.dropdown}>
      <button type='button' onClick={() => setDropdown(!dropdown)}>
        <div className={styles.select}>
          <span className={cx({ [styles.colorChange]: isSecond })}>{DROPDOWN_TITLE[selected]}</span>
          <ArrowDown />
        </div>
      </button>
      <ul className={cx(styles.dropdownList, dropdown && styles.active)}>
        {dataArr?.map((item) => {
          return (
            <li key={item}>
              <button type='button' onClick={optionButtonClick} value={item}>
                {DROPDOWN_TITLE[item]}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Dropdown
