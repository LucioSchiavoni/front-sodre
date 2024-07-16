import React from 'react'
import Navbar from '../components/navbar/Navbar'
import StarsCanvas from './StarBackground'
import Footer from '../components/footer/Footer'


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
  <>
  <div className='flex justify-center '>
  <StarsCanvas/>

       <Navbar/>

 

        <div className='mt-16 absolute z-50'>
          {children}
            <Footer/> 
        </div>
       
    </div>
  
  </>
  
  )
}

export default Layout