import { createSlice } from '@reduxjs/toolkit'
import store from 'store'

const adSlice = createSlice({
  name: 'adOption',
  initialState: {
    selectedOption: store.get('persist:option') || 'all',
  },
  reducers: {
    changeSelectedOption: (state, action) => {
      state.selectedOption = action.payload
    },
  },
})

export const { changeSelectedOption } = adSlice.actions
export default adSlice.reducer
