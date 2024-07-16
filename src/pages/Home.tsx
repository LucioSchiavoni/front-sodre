import { Link } from "react-router-dom"
import Image from '../assets/Logo_sodre.jpg'
import LoginForm from "../components/forms/LoginForm"
import { motion } from "framer-motion"
import { slideInFromLeft, slideInFromTop } from "../layout/motion"
import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react"
import RegisterForm from "../components/forms/RegisterForm"


const Home = () => {

  return ( 
    <>
    <motion.div initial="hidden" animate="visible" className="bg-white dark:bg-gray-900">
    <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-3/4 bg-center ">
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                <div>
                    <motion.div variants={slideInFromTop} className="text-3xl font-bold text-white sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-800">Sorteos MEC</motion.div>

                    <motion.div variants={slideInFromLeft(0.5)} className="max-w-xl mt-3 text-white text-2xl">
                        Sorteo de entradas para el Ministerio de Educacion y Cultura
                    </motion.div>
                </div>
            </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">

            <div className="flex justify-center mx-auto">
                        <img className=" h-24 w-24" src={Image} alt=""/>
                    </div>
                <Tabs size='md' variant='enclosed'>
  <TabList>
    <Tab className="font-medium text-2xl">Inicia sesión</Tab>
    <Tab className="font-medium text-2xl">Registrarse</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <div className="">

<LoginForm/>
  <aside className="flex flex-col justify-center items-center">
  <p className="mt-6 text-xl font-semibold text-center mb-2 text-neutral-900">No tienes cuenta aun? </p>
    <Link to='/registro' className="px-3 py-1 border rounded-md w-64 text-xl bg-neutral-900 text-white text-center font-medium focus:outline-none focus:underline hover:underline">Registrarse</Link>
  </aside>

</div>
    </TabPanel>
    <TabPanel>
      <RegisterForm/>
    </TabPanel>
  </TabPanels>
</Tabs>
                
            </div>
        </div>
    </div>
</motion.div>
    </>
   
  )
}

export default Home


