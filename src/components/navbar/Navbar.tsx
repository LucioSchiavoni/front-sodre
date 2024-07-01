import { useAuthStore } from "../../auth/auth"

const Navbar = () => {

    const logout = useAuthStore((state) => state.logout)
  return (
    <div className="flex gap-5">Navbar

        <button onClick={logout} className="text-black border ">Cerrar sesion</button>
    </div>
  )
}

export default Navbar