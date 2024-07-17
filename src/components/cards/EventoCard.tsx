import { useQuery } from "@tanstack/react-query"
import { Evento } from "../../interface/evento"
import { deleteEventoRequest, mostrarEventosRequest } from "../../api/evento"
import { useAuthStore } from "../../auth/auth";
import FechaModal from "../modal/FechaModal";
import { obtenerFecha } from "../../utils/FechaFormat";
import ParticipantesModal from "../modal/participantes/ParticipantesModal";
import Image from '../../assets/sodre-default.jpg'
import { toast } from "react-toastify";
import ConfirmDelete from "../modal/delete/ConfirmDelete";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromTop } from "../../layout/motion";
import { MdOutlineDateRange } from "react-icons/md";

export const EventoCard = () => {

    const { data, isLoading } = useQuery<Evento[], Error>({
        queryKey: ["eventos"], 
        queryFn: mostrarEventosRequest,
      });

    const user = useAuthStore((state) => state.profile)
    const userId = user.id

    const handleDelete = async(id: number) => {
      try {
        const res = await deleteEventoRequest(id)
        toast.info(res.data.success)
      } catch (error) {
        console.log(error)
      }finally{
        setTimeout(() => {
          window.location.reload()
        }, 2000) 
        
      }
    }

    if(isLoading)
        return (
    <div>Cargando...</div>
        )

    if(data)
  return (
    <>
<motion.div initial="hidden" animate="visible" className="py-12 grid grid-cols-1 gap-16 ">
    { 
        data.map((item: Evento, index) => (
          
<div key={index} className="relative w-[80rem] hover:scale-110 transition-all duration-300 delay-150 h-[35rem] bg-cover bg-center rounded-lg overflow-hidden shadow-lg " style={{ backgroundImage: `url(${item.imagen === "" ? Image : item.imagen})` }}>
<div className="absolute inset-0  hover:bg-black transition-all duration-300 delay-150  hover:bg-opacity-50 ">
  <article className="p-8 text-neutral-900 ">
     <motion.h2 variants={slideInFromTop} className="text-3xl font-bold  ">{item.nombre_evento}</motion.h2>
  </article>

    <div className="text-white flex justify-between p-10  mt-2 transition-all  ">
       <div className="flex flex-col w-80 ">
        <motion.p variants={slideInFromLeft(0.5)} className="text-neutral-800 text-xl font-medium">{item.descripcion}</motion.p>
        <div className="flex flex-col mt-10 text-xl text-black">
       <p className="flex items-center gap-2 font-semibold"> <MdOutlineDateRange /> Fechas</p>
       
        <div className="flex gap-3 mt-2  text-xl">
          
        {item.fechas_evento.map((item, index) => (
            <motion.p variants={slideInFromLeft(0.5)} key={index} className="text-neutral-800  font-medium">
              {obtenerFecha(item.fecha)}
          </motion.p>
        ))}
       </div>
       </div>
       </div>
       {
        user.rol === "USER" ?
        <>
        <div className="absolute bottom-10 ">
          <FechaModal fechas={item.fechas_evento.map((item => item.fecha))} userId={userId} eventoId={item.id}/>
        </div>
        </>
        :
        null
       }
       <div>

       </div>
    {
          user.rol === "ADMIN" ?
     <>
     <div className="flex gap-2 absolute bottom-10 right-24 ">
      <ParticipantesModal id={item.id}  entradas={item.entradas} />
      <ConfirmDelete onClick={() => handleDelete(item.id)}/>

      </div>
     </>
      :
      null
          
        } 
      

  
    </div>
</div>
</div>
         
   ))
    }  
     </motion.div>
    </>
  )
}

