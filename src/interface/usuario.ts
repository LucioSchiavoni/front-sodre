export interface Usuario {
    id:number;
    nombre: string;
    username: string;
    email: string;
    cedula: string;
    sector: string;
    ganador_anterior: boolean;
}


export interface CreateUser {
    nombre: string;
    username: string;
    password:string;
    email: string;
    cedula: string;
    sector: string;
    rol:string;
}