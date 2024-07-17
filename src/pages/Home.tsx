
import Image from '../assets/Logo_sodre.jpg'
import LoginForm from "../components/forms/LoginForm"
import { motion } from "framer-motion"
import { slideInFromLeft, slideInFromTop } from "../layout/motion"
import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react"
import RegisterForm from "../components/forms/RegisterForm"
import Video from  '../assets/background-video.mp4'

const Home = () => {

  return ( 
    <>
    <motion.div initial="hidden" animate="visible" className=" dark:bg-gray-900">
    <video 
        autoPlay
        muted
        loop
        className=' absolute  h-full w-full  z-[-0] object-cover'
        >

        <source src={Video} type="video/mp4" />

        </video> 
    <div className="flex justify-center h-screen ">
        <div className="hidden bg-cover lg:block lg:w-full bg-center z-10">
            <div className="flex items-center h-full px-20   z-10">
                <div>
                    <motion.div variants={slideInFromTop} className="text-3xl font-bold text-white sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-800">Sorteos MEC</motion.div>

                    <motion.div variants={slideInFromLeft(0.5)} className="max-w-xl mt-3 text-white text-2xl">
                        Sorteo de entradas para el Ministerio de Educacion y Cultura
                    </motion.div>
                </div>
            </div>
        </div>
        <div className="flex items-center  w-full max-w-md px-6 mx-auto z-10 bg-white dark:bg-neutral-900 text-black dark:text-white lg:w-2/6">
            <div className="flex-1">

            <div className="flex justify-center mx-auto">
                        <img className=" h-24 w-24 rounded-full mb-4" src={Image} alt=""/>
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


