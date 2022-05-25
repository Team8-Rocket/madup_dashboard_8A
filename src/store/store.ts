import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import adSlice from './adSlice'

const reducers = combineReducers({
  adOption: adSlice,
})

const persistConfig = {
  key: 'option',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
})

export default store
