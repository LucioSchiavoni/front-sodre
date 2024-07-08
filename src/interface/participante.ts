export interface CrearParticipante {
   usuarioId: number;
   eventoId: number;
   fecha_participante: string[];
   cantidad_entradas: number;
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
      nombre: string;
      username: string;
      cedula: string;
      sector: string;
   }
}

interface FechaSeleccionada {
      id: number;
      fecha: string;
      participanteId: number;
}