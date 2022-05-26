import { Routes, Route } from 'react-router-dom'
import Advertise from './Advertise'
import Dashboard from './Dashboard'
import Wrapper from './Wrapper'

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
