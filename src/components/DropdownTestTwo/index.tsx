import React, { useEffect, useRef, useState } from 'react'
import { cx } from 'styles'
import { useAppDispatch } from 'hooks'

import { setWeekSelect } from 'states/dashboard'

import styles from './dropdown.module.scss'
import { ArrowDown } from 'assets/svgs'

const Dropdown = () => {
  const [dropdown, setDropdown] = useState(false)
  const [select, setSelect] = useState('일간')
  const dispatch = useAppDispatch()

  const clickOuter = useRef<HTMLDivElement>(null)

  const handleClickList = (e: React.MouseEvent<HTMLButtonElement>) => {
    let result
    select === '주간' ? (result = true) : (result = false)
    dispatch(setWeekSelect(result))
    setSelect(e.currentTarget.name)
    setDropdown(false)
  }

  const handleClickOutSide = (e: any) => {
    if (dropdown && !clickOuter.current?.contains(e.target)) setDropdown(false)
  }

  useEffect(() => {
    if (dropdown) document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  })

  return (
    <div ref={clickOuter} className={styles.dropdown}>
      <button type='button' onClick={() => setDropdown(!dropdown)}>
        <div className={styles.select}>
          <span>{select}</span>
          <ArrowDown />
        </div>
      </button>
      <ul className={cx(styles.dropdownList, dropdown && styles.active)}>
        <li>
          <button type='button' name='주간' onClick={handleClickList}>
            주간
          </button>
        </li>
        <li>
          <button type='button' name='일간' onClick={handleClickList}>
            일간
          </button>
        </li>
      </ul>
    </div>
  )
}
export default Dropdown
