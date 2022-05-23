import { Routes, Route } from 'react-router-dom'

import Gnb from '../components/Wrapper/Gnb'
import Advertise from './Advertise'
import Dashboard from './Dashboard'
import styles from './routes.module.scss'
import Wrapper from '../components/Wrapper'

const App = () => {
  return (
    <Routes>
      <Route element={<Wrapper />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='advertise' element={<Advertise />} />
      </Route>
    </Routes>
  )
}

export default App
