import { FechaSeleccionada } from "./participante";



export interface Ganadores {
    id: number;
    usuarioId: number;
    usuario: {
        id:number;
    nombre: string;
    username: string;
    email: string | null;
    cedula: string;
    sector: string;
    ganador_anterior: boolean;
    }
}

export interface Participante {
    fecha_seleccionada: FechaSeleccionada[];
}