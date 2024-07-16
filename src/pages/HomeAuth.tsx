import { Link } from "react-router-dom"
import { useAuthStore } from "../auth/auth"
import { EventoCard } from "../components/cards/EventoCard"
import Layout from "../layout/Layout"
import StarsCanvas from "../layout/StarBackground"
import { motion } from "framer-motion"
import { slideInFromTop } from "../layout/motion"

const HomeAuth = () => {

    const user = useAuthStore((state) => state.profile)
    const userRol = user.rol


  return (


  
<div className="min-h-screen bg-no-repeat   bg-cover object-cover bg-[url(https://sodre.gub.uy/wp-content/uploads/2024/02/patrimonio2-100-1024x580.jpg)]">
   

 <Layout>



                
                {
            userRol === "ADMIN" ?
            <>
            <Link to='/crearEvento' className="absolute bg-white top-0 left-0 border px-3 py-1 rounded-md shadow-md">Publicar evento</Link>
            <div className="">
                <EventoCard/>
            </div>
            </>
            :

            <>
            <div className="">
            <EventoCard/>
            </div>
            </>
        }
    
  </Layout>
</div> 
  )
}

export default HomeAuth

 