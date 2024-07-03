import { toast } from "react-toastify";
import clienteAxios from "../config/axios"
import { CrearParticipante } from "../interface/participante";


export const crearParticipante = async(data: CrearParticipante): Promise<CrearParticipante | any> => {
    try {
        const res = await clienteAxios.post("/participante", data)
        toast.success(res.data)
    } catch (error) {
        console.log(error)
    }
}