import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

export interface AdvertiseState {
  selectedOption: string
}

const INITIAL_STATE: AdvertiseState = {
  selectedOption: 'all',
}

const advertiseSlice = createSlice({
  name: 'advertise',
  initialState: INITIAL_STATE,
  reducers: {
    changeSelectedOption: (state: AdvertiseState, action: PayloadAction<string>) => {
      state.selectedOption = action.payload
    },
  },
})
export const { changeSelectedOption } = advertiseSlice.actions
export const getStartDate = (state: RootState): string => state.advertise.selectedOption

export default advertiseSlice.reducer
