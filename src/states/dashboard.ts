import store from 'store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BigNumber } from 'bignumber.js'

import data from 'data/trend-data-set.json'
import { IItem } from 'types/dashboard'

import type { RootState } from '.'

const newData = data.report.daily.map((item) => {
  const bigNum: BigNumber = new BigNumber(item.roas).dividedBy(100).multipliedBy(item.cost)
  const sales = Math.round(bigNum.toNumber() * 100) / 100
  return { ...item, sales }
})

export interface DashboardState {
  startDate: Date | null
  endDate: Date | null
  fitData: IItem[]
  fitPastData: IItem[]
  data: IItem[]
}

const INITIAL_STATE: DashboardState = {
  startDate: new Date('2022-04-13'),
  endDate: new Date('2022-04-20'),
  fitData: newData,
  fitPastData: newData,
  data: newData,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: INITIAL_STATE,
  reducers: {
    setStartDate: (state: DashboardState, action: PayloadAction<Date | null>) => {
      state.startDate = action.payload
    },
    setEndDate: (state: DashboardState, action: PayloadAction<Date | null>) => {
      state.endDate = action.payload
    },
    setFitData: (state: DashboardState, action: PayloadAction<IItem[]>) => {
      state.fitData = action.payload
    },
    setData: (state: DashboardState, action: PayloadAction<IItem[]>) => {
      state.fitData = action.payload
    },
    setPastData: (state: DashboardState, action: PayloadAction<IItem[]>) => {
      state.fitPastData = action.payload
    },
  },
})

export const { setStartDate, setEndDate, setFitData, setPastData } = dashboardSlice.actions
export const getStartDate = (state: RootState): Date | null => state.dashboard.startDate
export const getEndDate = (state: RootState): Date | null => state.dashboard.endDate
export const getFitData = (state: RootState): IItem[] => state.dashboard.fitData
export const getData = (state: RootState): IItem[] => state.dashboard.data
export const getPastData = (state: RootState): IItem[] => state.dashboard.fitPastData

export default dashboardSlice.reducer
