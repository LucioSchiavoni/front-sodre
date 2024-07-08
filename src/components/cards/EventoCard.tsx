import { useQuery } from "@tanstack/react-query"
import { Evento } from "../../interface/evento"
import { mostrarEventosRequest } from "../../api/evento"
import { useAuthStore } from "../../auth/auth";
import FechaModal from "../modal/FechaModal";
import { obtenerFecha } from "../../utils/FechaFormat";

import ParticipantesModal from "../modal/ParticipantesModal";

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
<div className="grid grid-cols-3 gap-4 p-24">
    { 
        data.map((item, index) => (
    <div className="relative w-64  bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70" key={index}>
  <img className="w-full h-auto rounded-xl object-cover" src={item.imagen} alt="Evento Imagen"/>
  <div className="absolute top-0 start-0 end-0">
    <div className="p-4 md:p-5">
      <h3 className="text-lg font-bold text-gray-800">
        {item.nombre_evento}
      </h3>
      {
        user.rol === "ADMIN" ?
        <>
        <div>
        <ParticipantesModal id={item.id}/>
        </div>
        </>
        :
        null
      }
      <p className="mt-1 text-gray-800">
        {item.descripcion}
            </p>
            <p className="mt-5">Fechas</p>
            <aside className="flex flex-col ">
           {
              item.fechas_evento.map((item, index) => (
                <div key={index} className="flex gap-2">
                <label className="ml-2">{obtenerFecha(item.fecha)}</label>
                </div>
                    ))
            }
            </aside>
             <div className="flex justify-center items-center">
              <FechaModal eventoId={item.id} userId={userId} fechas={item.fechas_evento.map((item => item.fecha))}/>   
            </div> 
               
    </div>

  </div>
  
</div>  
   ))
    }  
     </div>
    </>
  )
}
