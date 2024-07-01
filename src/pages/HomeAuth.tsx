import { useAuthStore } from "../auth/auth"
import Layout from "../layout/Layout"


const HomeAuth = () => {

    const user = useAuthStore((state) => state.profile)
    const userRol = user.rol


  return (
    <Layout>

        {

            userRol === "ADMIN" ?
            <>
            <div>
                Componente Home Admin
            </div>
            </>
            :

            <>
            <div>
                Componente Home User
            </div>
            </>
        }

    </Layout>
 
  )
}

export default HomeAuth