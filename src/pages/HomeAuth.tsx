import { Link } from "react-router-dom"
import { useAuthStore } from "../auth/auth"
import { EventoCard } from "../components/cards/EventoCard"
import Layout from "../layout/Layout"


const HomeAuth = () => {

    const user = useAuthStore((state) => state.profile)
    const userRol = user.rol


  return (
    <Layout>

        {

            userRol === "ADMIN" ?
            <>
            <Link to='/crearEvento' className="absolute top-5 left-24 border px-3 py-1 rounded-md shadow-md">Publicar evento</Link>
            <div className="">
                <EventoCard/>
            </div>
            </>
            :

            <>
            <div>
            <EventoCard/>
            </div>
            </>
        }

    </Layout>
 
  )
}

export default HomeAuth