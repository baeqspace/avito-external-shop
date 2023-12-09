import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Welcome } from './pages/Welcome'
import { Catalog } from './pages/Catalog'
import { Contact } from './pages/Contact'
import { CardPage } from './pages/CardPage'
import { useState, useEffect, createContext } from 'react'
import { IntlContext } from './contexts/IntlContext'
import { AuthContext } from './contexts/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import AuthService from './services/AuthService'
import { Admin } from './pages/Admin'
import { Cart } from './pages/Cart'

function App() {

  const [theme, setTheme] = useState('')
  const [currentLocale, setCurrentLocale] = useState('')
  const [authUser, setAuthUser] = useState(null)

  async function checkAuth() {
    if (!localStorage.getItem('token')) {setAuthUser('unauth');return}

    const data = await AuthService.checkAuth()
    if (!data?.user) {
      setAuthUser('unauth')
      localStorage.removeItem('token')
      return
    }
    setAuthUser(data.user)
  }


  useEffect(() => {
    checkAuth()
  },[])

  return (
    <div id="app" className={`${theme} grid h-screen`}>
      <IntlContext.Provider value={[currentLocale, setCurrentLocale]}>
        <AuthContext.Provider value={[authUser, setAuthUser, checkAuth]}>
          <Header setTheme={setTheme} />
          <main>
            <Routes>
              <Route path='/baeq-aes/' element={<Welcome />} />
              <Route path='/baeq-aes/catalog' element={<Catalog />} />
              <Route path='/baeq-aes/contact' element={<Contact />} />
              <Route path='/baeq-aes/catalog/:id' element={<CardPage />} />
              <Route path='/baeq-aes/*' element={<Navigate replace to='/baeq-aes/'/>}/>
              <Route path='/baeq-aes/login' element={<LoginPage />}/>
              <Route path='/baeq-aes/profile' element={authUser !== 'unauth' || !authUser ? <ProfilePage /> : <Navigate to='/baeq-aes/login'/>} />
              {(authUser?.roles?.includes('admin') || !authUser) && <Route path='/baeq-aes/admin' element={<Admin />} />}
              <Route path='/baeq-aes/cart' element={<Cart />} />
            </Routes>
          </main>
        </AuthContext.Provider>
      </IntlContext.Provider>
    </div>
  )
}

export default App