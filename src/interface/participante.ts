

export interface CrearParticipante {
   usuarioId: number;
   eventoId: number;
   fecha_participante: string[];
}

export interface Participante {
   id: number;
   usuarioId: number;
   eventoId: number;
   fecha_participante: string;
   fecha_cambio_participante: string;
   cantidad_entradas: number;
   fecha_seleccionada: FechaSeleccionada[];
   usuario: {
      id:number;
    nombre: string;
    username: string;
    email: string;
    cedula: string;
    sector: string;
    ganador_anterior: boolean;
   }
}

export interface FechaSeleccionada {
   id: number;
   fecha: string;
   participanteId: number;
}