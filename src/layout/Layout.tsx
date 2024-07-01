import React from 'react'
import Navbar from '../components/navbar/Navbar'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
  <>
    <div className='w-64 m-auto '><Navbar/></div>
    <div className=' mt-2 border flex items-center justify-center '>
        {children}
    </div>
  </>
  
  )
}

export default Layout