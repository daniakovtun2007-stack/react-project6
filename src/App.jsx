import { Route, Routes } from 'react-router-dom'
import Auth from './Auth.jsx'
import Home from './Home.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
