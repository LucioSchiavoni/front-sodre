import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import { useAuthStore } from './auth/auth'
import Home from './pages/Home'
import { ProtectedRoute } from './utils/ProtectedRoute'
import HomeAuth from './pages/HomeAuth'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import CrearEventoPage from './pages/CrearEventoPage'


function App() {


  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route element={<ProtectedRoute isAllowed={isAuth} />}> 

        <Route path='/auth' element={<HomeAuth/>} />
        <Route path='/crearEvento' element={<CrearEventoPage/>} />
   
        
        </Route>
      </Routes>
      <ToastContainer position='top-right'
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      </BrowserRouter>
    </>
  )
}

export default App
