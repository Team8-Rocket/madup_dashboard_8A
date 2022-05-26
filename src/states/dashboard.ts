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
  startDate: Date
  endDate: Date
  fitNowData: IItem[]
  fitPastData: IItem[]
  data: IItem[]
  firstSelect: string
  secondSelect: string
  weekSelect: Boolean
}

const INITIAL_STATE: DashboardState = {
  startDate: new Date('2022-04-13'),
  endDate: new Date('2022-04-20'),
  fitNowData: newData,
  fitPastData: newData,
  data: newData,
  firstSelect: 'roas',
  secondSelect: 'cost',
  weekSelect: true,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: INITIAL_STATE,
  reducers: {
    setStartDate: (state: DashboardState, action: PayloadAction<Date>) => {
      state.startDate = action.payload
    },
    setEndDate: (state: DashboardState, action: PayloadAction<Date>) => {
      state.endDate = action.payload
    },
    setFitNowData: (state: DashboardState, action: PayloadAction<IItem[]>) => {
      state.fitNowData = action.payload
    },
    setData: (state: DashboardState, action: PayloadAction<IItem[]>) => {
      state.data = action.payload
    },
    setPastData: (state: DashboardState, action: PayloadAction<IItem[]>) => {
      state.fitPastData = action.payload
    },
    setFirstSelect: (state: DashboardState, action: PayloadAction<string>) => {
      state.firstSelect = action.payload
    },
    setSecondSelect: (state: DashboardState, action: PayloadAction<string>) => {
      state.secondSelect = action.payload
    },
    setWeekSelect: (state: DashboardState, action: PayloadAction<Boolean>) => {
      state.weekSelect = action.payload
    },
  },
})

export const { setStartDate, setEndDate, setFitNowData, setPastData, setFirstSelect, setSecondSelect, setWeekSelect } =
  dashboardSlice.actions
export const getStartDate = (state: RootState): Date => state.dashboard.startDate
export const getEndDate = (state: RootState): Date => state.dashboard.endDate
export const getFitNowData = (state: RootState): IItem[] => state.dashboard.fitNowData
export const getData = (state: RootState): IItem[] => state.dashboard.data
export const getPastData = (state: RootState): IItem[] => state.dashboard.fitPastData
export const getFirstSelect = (state: RootState): string => state.dashboard.firstSelect
export const getSecondSelect = (state: RootState): string => state.dashboard.secondSelect
export const getWeekSelect = (state: RootState): Boolean => state.dashboard.weekSelect

export default dashboardSlice.reducer
