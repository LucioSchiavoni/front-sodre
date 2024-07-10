import clienteAxios from "../config/axios"
import { Ganadores } from "../interface/ganadores";



export const generarGanadoresRequest = async(data:any): Promise<any> => {
    try {
        const ganadoresData = await clienteAxios.post("/ganadores", data)
        return ganadoresData.data;
    } catch (error) {
        console.log(error)
    }
}


export const getGanadoresRequest = async(eventoId:number): Promise<Ganadores[] | any> => {
    try {
        const result = await clienteAxios.get(`/search/ganadores/${eventoId}`)
        return result;
    } catch (error) {
        console.log(error)
    }
}