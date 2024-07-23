import React from 'react'
import Navbar from '../components/navbar/Navbar'
import StarsCanvas from './StarBackground'





const Layout = ({children}: {children: React.ReactNode}) => {
  return (
  <>
  <div className='flex  justify-center  '>
  <StarsCanvas/>
      <Navbar/>
        <div className='mt-16 absolute  z-50'>
          {children}
        </div>
    </div>
  </>
  
  )
}

export default Layout