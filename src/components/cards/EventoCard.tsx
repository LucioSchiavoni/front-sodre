import { useQuery } from "@tanstack/react-query"
import { Evento } from "../../interface/evento"
import { mostrarEventosRequest } from "../../api/evento"
import { useAuthStore } from "../../auth/auth";
import FechaModal from "../modal/FechaModal";
import { obtenerFecha } from "../../utils/FechaFormat";
import ParticipantesModal from "../modal/participantes/ParticipantesModal";
import Image from '../../assets/sodre-default.jpg'


export const EventoCard = () => {

    const { data, isLoading } = useQuery<Evento[], Error>({
        queryKey: ["eventos"], 
        queryFn: mostrarEventosRequest,
      });

    const user = useAuthStore((state) => state.profile)
    const userId = user.id

    if(isLoading)
        return (
    <div>Cargando...</div>
        )

    if(data)
  return (
    <>
<div className="py-12 grid grid-cols-2 gap-4 px-10 sm:gap-6 md:gap-8 lg:gap-12 ">
    { 
        data.map((item: Evento, index) => (
  
            <div className="group block w-8/12 border shadow-xl rounded-md px-4"  key={index}>
    <div className="aspect-w-16 aspect-h-12 overflow-hidden shadow-xl bg-gray-100 rounded-2xl dark:bg-neutral-800">
      {
        item.imagen ? <img className="group-hover:scale-105 h-[430px] shadow-xl transition-transform duration-500 ease-in-out object-cover rounded-2xl" src={item.imagen} alt="Image Description"/>
        :
        <img className="group-hover:scale-105 transition-transform shadow-xl duration-500 ease-in-out object-cover rounded-2xl" src={Image} alt="Image Description"/>
      }
      
    </div>

    <div className="pt-4 py-4">
      <h3 className="relative inline-block font-medium text-lg text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-neutral-900 before:transition before:origin-left before:scale-x-0 group-hover:before:scale-x-100 dark:text-gray-500">
        {item.nombre_evento}
      </h3>
     {
              item.fechas_evento.map((item, index) => (
                <div key={index} className="flex gap-2">
                <label className="ml-2">{obtenerFecha(item.fecha)}</label>
                </div>
                    ))
            }
  <p className="mt-1 text-gray-600 dark:text-neutral-400">
       {item.descripcion}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
         
           <FechaModal eventoId={item.id} userId={userId} fechas={item.fechas_evento.map((item => item.fecha))}/>   
    
        
         { user.rol === "ADMIN" ?
           <ParticipantesModal id={item.id}/>
        :
        null
        }

  
          {user.rol === "ADMIN" ?
          <button className="px-3 py-1 rounded-md border shadow-xl font-medium"> Borrar evento</button>
          :
          null
        }
    
      </div>
    </div>
  </div>
   ))
    }  
     </div>
    </>
  )
}
