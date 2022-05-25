import { useState, useEffect, MouseEvent } from 'react'
import dayjs, { ManipulateType } from 'dayjs'
import { dateDifference } from 'services/allAdsStatus'

const AllStatusChart = () => {
  const onClick = (num: number, str: ManipulateType | undefined = 'day') => {
    const { pastDate, toDay } = dateDifference(num, str)
    console.log(dayjs(pastDate).format('YYYY-MM-DD'))
    console.log(dayjs(toDay).format('YYYY-MM-DD'))
  }
  return (
    <div>
      <button type='button' onClick={() => onClick(7)}>
        일간
      </button>
      <button type='button' onClick={() => onClick(1, 'month')}>
        주간
      </button>
      <button type='button' onClick={() => onClick(2, 'month')}>
        월간
      </button>
    </div>
  )
}

export default AllStatusChart
