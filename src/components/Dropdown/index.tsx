import styles from './dropdown.module.scss'
import { ArrowBottom } from '../../assets/svgs'
import React, { useState } from 'react'
import { cx } from '../../styles'

const Dropdown = () => {
  const [dropdown, setDropdown] = useState(false)
  const [select, setSelect] = useState('매드업')

  const handleClickList = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelect(e.currentTarget.name)
    setDropdown(false)
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.select}>
        <span>{select}</span>
        <button type='button' onClick={() => setDropdown(!dropdown)}>
          <ArrowBottom />
        </button>
      </div>
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
