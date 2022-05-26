import { configureStore } from '@reduxjs/toolkit'
import dashboard from './dashboard'
import advertise from './advertise'

export const store = configureStore({
  reducer: {
    dashboard,
    advertise,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
