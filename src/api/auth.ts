import { isAxiosError } from "axios";
import clienteAxios from "../config/axios";



export const loginRequest = async ( userData: {username: string, password: string}) => {
    try { 
        const response =  await clienteAxios.post("/login", userData)
        return response
    } catch (error) {
            if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }

}

export const auth = async() => {
    try {
        const res = await clienteAxios.get("/auth")
        return res.data
    } catch (error) {
        console.log("Error del api auth: ", error)        
    }
}


export const registerRequest = async(data:any): Promise<any> => {
    try {
        const res = await clienteAxios.post("/registro", data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}