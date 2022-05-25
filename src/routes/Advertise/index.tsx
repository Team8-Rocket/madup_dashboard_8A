import { useMemo, useState, useRef, useEffect, MouseEvent } from 'react'
import cx from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import styles from './advertise.module.scss'
import { ArrowDown } from 'assets/svgs'
import { IAds } from 'types/ads'

import adListDataSet from 'data/adListDataSet.json'
import AdItem from './AdItem/AdItem'
import { changeSelectedOption } from 'states/advertise'

const Advertise = () => {
  const [showOptions, setShowOptions] = useState(false)
  const { selectedOption } = useSelector((state: IAds) => state.advertise)
  const dispatch = useDispatch()

  const optionRef = useRef<HTMLUListElement>(null)

  const handleChangeOption = () => setShowOptions((prevOption) => !prevOption)

  const handleChangeSelecteOption = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(changeSelectedOption(e.currentTarget.value))
    handleChangeOption()
  }

  const textOption = {
    all: '전체 광고',
    active: '진행중',
    ended: '중단됨',
  }[selectedOption]

  const handleMapAdItems = useMemo(() => {
    if (selectedOption === 'all') return adListDataSet.ads.map((adItem) => <AdItem key={adItem.id} adItem={adItem} />)
    return adListDataSet.ads.map((adItem) =>
      adItem.status === selectedOption ? <AdItem key={adItem.id} adItem={adItem} /> : null
    )
  }, [selectedOption])

  const handleClickOutSide = (e: any) => {
    if (showOptions && !optionRef.current?.contains(e.target)) setShowOptions(false)
  }

  useEffect(() => {
    if (showOptions) document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  })

  return (
    <section className={styles.advertiseWrapper}>
      <h1>광고관리</h1>
      <div className={styles.container}>
        <div className={styles.buttonList}>
          <button
            type='button'
            onClick={handleChangeOption}
            className={cx(styles.adListButton, { [styles.open]: showOptions })}
          >
            {textOption}
            <ArrowDown />
          </button>
          <button type='button' className={styles.adAddButton}>
            광고 만들기
          </button>
          <ul ref={optionRef} className={cx(styles.options, { [styles.open]: showOptions })}>
            <li>
              <button type='button' value='all' onClick={handleChangeSelecteOption}>
                전체 광고
              </button>
            </li>
            <li>
              <button type='button' value='active' onClick={handleChangeSelecteOption}>
                진행중
              </button>
            </li>
            <li>
              <button type='button' value='ended' onClick={handleChangeSelecteOption}>
                중단됨
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.adList}>{handleMapAdItems}</div>
      </div>
    </section>
  )
}
export default Advertise
