import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './Auth.jsx'
import Home from './Home.jsx'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <Routes>
      <Route path="/" element={<Auth theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/home" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
    </Routes>
  )
}

export default App
