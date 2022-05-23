import React from 'react'
import { Outlet } from 'react-router-dom'
import Gnb from './Gnb'
import UserOption from './UserOption'

const Wrapper = () => {
  return (
    <>
      <Gnb />
      <UserOption />
      <Outlet />
    </>
  )
}

export default Wrapper
