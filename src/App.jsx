import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './Auth.jsx'
import Home from './Home.jsx'
import translations from './translations.js'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [language, setLanguage] = useState(() =>
    localStorage.getItem('language') === 'en' ? 'en' : 'uk'
  )
  const [authToken, setAuthToken] = useState('')
  const t = translations[language]

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem('language', language)
  }, [language])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === 'uk' ? 'en' : 'uk'))
  }

  const handleLogout = useCallback(() => {
    setAuthToken('')
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <Auth
            theme={theme}
            toggleTheme={toggleTheme}
            toggleLanguage={toggleLanguage}
            onLoginSuccess={setAuthToken}
            t={t}
          />
        )}
      />
      <Route
        path="/home"
        element={(
          <Home
            theme={theme}
            toggleTheme={toggleTheme}
            toggleLanguage={toggleLanguage}
            authToken={authToken}
            onLogout={handleLogout}
            t={t}
          />
        )}
      />
    </Routes>
  )
}

export default App
