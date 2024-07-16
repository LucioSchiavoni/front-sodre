import React from 'react'
import Navbar from '../components/navbar/Navbar'
import StarsCanvas from './StarBackground'


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
  <>
  <div className=' flex justify-center '>
  <StarsCanvas/>
<div className='w-full mt-5 z-50'>
  <Navbar/>

</div>
    
        <div className='mt-24 absolute z-50'>
          {children}
        </div>
    </div>
  </>
  
  )
}

export default Layout