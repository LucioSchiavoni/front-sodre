import Image from '../../assets/Logo_sodre.jpg'
import { useAuthStore } from "../../auth/auth"
import { IoLogOutOutline } from "react-icons/io5";
import { Tooltip } from "@chakra-ui/react";
import DarkMode from '../../utils/DarkMode';

const Navbar = () => {

    const logout = useAuthStore((state) => state.logout)
    // const user = useAuthStore((state) => state.profile)
  return (
    <div className="flex bg-white dark:bg-neutral-900 justify-between gap-2 p-3  rounded-md w-4/12 m-auto shadow-xl">
         <DarkMode/>
      <img src={Image} alt="" className='h-9' />
        <Tooltip label="Cerrar sesion">
        <button onClick={logout} className="px-3 py-1 hover:bg-gray-200 rounded-md transition-all">
        <span className="text-center items-center text-2xl"><IoLogOutOutline /></span>
        </button>
        </Tooltip> 
    </div>
  )
}

export default Navbar