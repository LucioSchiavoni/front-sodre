import { useQuery } from "@tanstack/react-query"
import { participanteByIdEvento } from "../api/participante"
import { Participante } from "../interface/participante";
import { useParams } from "react-router-dom";


const ParticipantesPage = () => {

    const eventoId = useParams();

    const {data, isLoading} = useQuery<Participante[]>({
        queryKey: ["eventoId", eventoId],
        queryFn: () => participanteByIdEvento(eventoId)
    })

    if(isLoading)
        return(
            <div>
                Cargando..
            </div>
        )

    if(data)
  return (
    <div>
        {
            data.map((participante: Participante, index: number) => (
                <div key={index}>
                    <p>{participante.usuario.nombre}</p>
                     <p>{participante.fecha_seleccionada.fecha}</p>
                </div>
            ))
        }
    </div>
  )
}

export default ParticipantesPage