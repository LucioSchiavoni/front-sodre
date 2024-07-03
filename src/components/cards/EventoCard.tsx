import { useQuery } from "@tanstack/react-query"
import { Evento } from "../../interface/evento"
import { mostrarEventosRequest } from "../../api/evento"
import { format, parseISO} from 'date-fns';
import {es} from 'date-fns/locale';
import { crearParticipante } from "../../api/participante";
import { useAuthStore } from "../../auth/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { CrearParticipante } from "../../interface/participante";

export const EventoCard = () => {

    const { data, isLoading } = useQuery<Evento[], Error>({
        queryKey: ["eventos"], 
        queryFn: mostrarEventosRequest,
      });

    const user = useAuthStore((state) => state.profile)
    const userId = user.id
    const [checkFecha, setCheckFecha] = useState<{ fecha: string}[]>([]);

      const addFechas = (fecha: string) => {
          setCheckFecha([...checkFecha, {fecha}])
      }
      
    const obtenerFecha = (fecha: string): string => {
        const fechaDate = parseISO(fecha);
        const fechaConfig = format(fechaDate, "dd MMMM", {locale: es} );
        return fechaConfig;
    }

    const handleParticipante = async(eventoId: number) => {
      try {
         if(checkFecha.length === 0){
          toast.info("Elija al menos una fecha")
          return;
        }
        const dataPart: CrearParticipante = {
          usuarioId: userId,
          eventoId: eventoId,
          fecha_participante: checkFecha.map(fecha => fecha.fecha)  
        }
        console.log("los datos del user: ", dataPart)
        // await crearParticipante(dataPart)
      } catch (error) {
        console.log(error)
      }
    }

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
    <div className="relative bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70" key={index}>
  <img className="w-full h-auto rounded-xl object-cover" src={item.imagen} alt="Evento Imagen"/>
  <div className="absolute top-0 start-0 end-0">
    <div className="p-4 md:p-5">
      <h3 className="text-lg font-bold text-gray-800">
        {item.nombre_evento}
      </h3>
      <p className="mt-1 text-gray-800">
        {item.descripcion}
            </p>
            <p className="mt-5">Fechas</p>
            <aside className="flex flex-col ">
                {
                    item.fechas_evento.map((fecha, index) => (
                        <div key={index} className="flex gap-2">
                           <input
                             type="checkbox"
                              onChange={() => addFechas(fecha.fecha)}
                              value={fecha.fecha}/>
                               <label className="ml-2">{obtenerFecha(fecha.fecha)}</label>
                        </div>
                    ))
                }
               
            </aside>
             <div className="flex justify-center items-center">
              <button onClick={() => handleParticipante(item.id)} className="w-40 border bg-gray-100 rounded-md py-1 px-3 ">Participar</button>   
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
