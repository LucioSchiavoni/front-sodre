import { useAuthStore } from "../../auth/auth"
import { IoLogOutOutline } from "react-icons/io5";
import { Tooltip } from "@chakra-ui/react";
import DarkMode from '../../utils/DarkMode';
import CreateEvent from "../modal/evento/CreateEvent";

const Navbar = () => {

    const logout = useAuthStore((state) => state.logout)
    const user = useAuthStore((state) => state.profile)
  return (
    <div className="flex z-10 dark:bg-neutral-900 justify-between  p-3  w-full m-auto shadow-xl">
        
    {
      user.rol === "ADMIN" ?
      
      <div className=''>
        <Tooltip label='Crear evento'>
        <CreateEvent/>
      </Tooltip>
      </div>
      
      :
      null
    } 
    <DarkMode/>
    <div className='flex gap-5'>
       <h2 className='text-black  flex items-center text-xl capitalize dark:text-white font-medium'>Bienvenido {user.nombre}</h2>
        <Tooltip label="Cerrar sesion">
        <button onClick={logout} className="px-3 py-1 hover:bg-gray-200 rounded-md transition-all">
        <span className="text-center items-center text-2xl dark:text-white"><IoLogOutOutline /></span>
        </button>
        </Tooltip> 
    </div>
       
    </div>
  )
}

export default Navbar