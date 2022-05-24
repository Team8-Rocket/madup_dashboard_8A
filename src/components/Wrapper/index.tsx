import React from 'react'
import { Outlet } from 'react-router-dom'
import Gnb from './Gnb'
import UserOption from './UserOption'
import styles from './wrapper.module.scss'

const Wrapper = () => {
  return (
    <div className={styles.wrapper}>
      <Gnb />
      <main>
        <UserOption />
        <Outlet />
      </main>
    </div>
  )
}

export default Wrapper
