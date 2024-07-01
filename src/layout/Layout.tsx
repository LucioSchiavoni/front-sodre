import React from 'react'
import Navbar from '../components/navbar/Navbar'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
  <>
    <div className='mt-5'><Navbar/></div>
    <div className=' mt-2  flex items-center justify-center '>
        {children}
    </div>
  </>
  
  )
}

export default Layout