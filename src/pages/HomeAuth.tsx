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