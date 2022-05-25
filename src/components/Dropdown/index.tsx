import styles from './dropdown.module.scss'
import { ArrowDown } from '../../assets/svgs'
import React, { useEffect, useRef, useState } from 'react'
import { cx } from '../../styles'

const Dropdown = () => {
  const [dropdown, setDropdown] = useState(false)
  const [select, setSelect] = useState('매드업')

  const clickOuter = useRef<HTMLDivElement>(null)

  const handleClickList = (e: React.MouseEvent<HTMLButtonElement>) => {
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
          <button type='button' name='매드업' onClick={handleClickList}>
            매드업
          </button>
        </li>
        <li>
          <button type='button' name='서비스 추가하기' onClick={handleClickList}>
            서비스 추가하기
          </button>
        </li>
      </ul>
    </div>
  )
}
export default Dropdown
