export interface Ganadores {
    id: number;
    usuarioId: number;
    usuario: {
        id: number;
        nombre:string;
        username:string;
        cedula: string;
        sector:string;
        ganador_anterior:boolean;
    }
}