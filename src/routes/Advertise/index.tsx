import { useMemo, useState, useRef, useEffect } from 'react'
import cx from 'classnames'

import styles from './advertise.module.scss'
import adListDataSet from '../../data/adListDataSet.json'
import { ArrowDown } from '../../assets/svgs'

import AdItem from './AdItem'

const Advertise = () => {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState('all')
  const optionRef = useRef<HTMLDivElement>(null)

  const handleChangeOption = () => setShowOptions((prevOption) => !prevOption)

  const handleChangeSelecteOption = (e: any) => {
    setSelectedOption(e.target.value)
    handleChangeOption()
  }

  const changeTextOption = (option: string) => {
    switch (option) {
      case 'all':
        return '전체 광고'
      case 'active':
        return '진행중'
      case 'ended':
        return '중단됨'
      default:
        return null
    }
  }

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
          <button type='button' onClick={handleChangeOption} className={styles.adListButton}>
            {changeTextOption(selectedOption)}
            <ArrowDown className={cx({ [styles.open]: showOptions })} />
          </button>
          <button type='button' className={styles.adAddButton}>
            광고 만들기
          </button>
          <div
            ref={optionRef}
            tabIndex={0}
            role='button'
            onClick={handleChangeSelecteOption}
            className={cx(styles.options, { [styles.open]: showOptions })}
          >
            <button type='button' value='all'>
              전체 광고
            </button>
            <button type='button' value='active'>
              진행중
            </button>
            <button type='button' value='ended'>
              중단됨
            </button>
          </div>
        </div>
        <div className={styles.adList}>{handleMapAdItems}</div>
      </div>
    </section>
  )
}
export default Advertise
