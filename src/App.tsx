import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import { useAuthStore } from './auth/auth'
import Home from './pages/Home'
import { ProtectedRoute } from './utils/ProtectedRoute'
import HomeAuth from './pages/HomeAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import NotFound from './pages/NotFound.tsx'



function App() {


  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <>
      <BrowserRouter basename='/sodre/'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route element={<ProtectedRoute isAllowed={isAuth} />}> 
        <Route path='/Inicio' element={<HomeAuth/>} />
        <Route path='/*' element={<NotFound/>} />
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
