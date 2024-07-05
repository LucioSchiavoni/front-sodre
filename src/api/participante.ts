import clienteAxios from "../config/axios"
import { CrearParticipante, Participante } from "../interface/participante";
import { isAxiosError } from "axios";


export const crearParticipante = async(data: CrearParticipante): Promise<CrearParticipante | any> => {
    try {
        const res = await clienteAxios.post("/participante", data)
        return res.data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}


export const participanteByIdEvento = async(eventoId: number): Promise<Participante[]> => {
    try {
        const res = await clienteAxios.get(`/participante/${eventoId}`)
        return res.data;
    } catch (error) {
        console.log(error)
        throw new Error("Error al obtener eventos");
    }
}