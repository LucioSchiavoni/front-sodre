export interface Evento {
    id: number;
    nombre_evento: string;
    imagen: string | undefined;
    descripcion: string;
    entradas: number;
    fecha_eliminado: string | null;
    fechas_evento: {fecha: string}[];
    participantes: any[];
  }
  