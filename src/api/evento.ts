import clienteAxios from "../config/axios";
import { Evento } from "../interface/evento";



export const crearEventoRequest = async(data:FormData) => {
    try {
        const res = await clienteAxios.post("/crearEvento", data)
        return res;
    } catch (error) {
        console.log(error)
    }
}


export const mostrarEventosRequest = async(): Promise<Evento[]> => {
    try {
        const res = await clienteAxios.get("/eventos")
        return res.data as Evento[];
    } catch (error) {
        console.log(error)
        throw new Error("Error al obtener eventos");
    }
}


export const deleteEventoRequest = async(id: number): Promise<Evento[] | any> => {
    try {
        const res = await clienteAxios.delete(`/evento/${id}`)
        return res;
    } catch (error) {
        console.log(error)
    }
}

