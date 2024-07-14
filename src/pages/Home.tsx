import { Link } from "react-router-dom"
import Video from '../assets/background-video.mp4'

const Home = () => {
  return ( 
    
   
   
    <div className="">
   
   <video 
        autoPlay
        muted
        loop
        className=' absolute top-0 left-0 z-[-1] '
        >

        <source src={Video} type="video/mp4" />
     </video>
      
      <article className="flex justify-center">
           <h1 className="text-5xl font-semibold  text-white absolute mt-60">
        Sorteo de entradas para el sodre
            </h1>
<aside className="absolute mt-80 gap-10 flex">
   <Link to='/registro' className="px-3 py-1 rounded-md hover:bg-gray-200  border shadow-xl w-80  bg-white  text-black  text-2xl font-medium  text-center">
  Registrarse
  </Link>
   <Link to='/login' className="px-3 py-1 rounded-md  border shadow-xl w-80 hover:bg-gray-200 bg-white  text-black  text-2xl font-medium  text-center">
        Login
        </Link> 
</aside>
 

        
      </article>
     
   
    </div>
  )
}

export default Home