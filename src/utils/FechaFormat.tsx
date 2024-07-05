import { format, parseISO } from "date-fns";
import {es} from 'date-fns/locale';

export const obtenerFecha = (fecha: string): string => {
    const fechaDate = parseISO(fecha);
    const fechaConfig = format(fechaDate, "dd MMMM", {locale: es} );
    return fechaConfig;
}