import { Link } from "react-router-dom"
import { useAuthStore } from "../../auth/auth"

const Navbar = () => {

    const logout = useAuthStore((state) => state.logout)
    const user = useAuthStore((state) => state.profile)
  return (
    <div className="flex justify-between gap-2 p-3 border rounded-md w-4/12 m-auto shadow-xl">
        <h2 className="text-xl flex">Benvenido {user.nombre}</h2>
        <Link to='/crearEvento'>
            Registro
        </Link>
        <button onClick={logout} className="text-black border rounded-md hover:bg-gray-100 px-3 py-1">Cerrar sesion</button>

    </div>
  )
}

export default Navbar