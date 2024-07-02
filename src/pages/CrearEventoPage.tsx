import { Link } from "react-router-dom"
import EventoForm from "../components/forms/EventoForm"


const CrearEventoPage = () => {
  return (
    <div>
      <Link to='/auth' className="absolute top-0 left-0 rounded-md border m-2 py-1 px-3 shadow-xl">
      Inicio
      </Link>
      <article className="mt-4">
      <EventoForm/>
      </article>
    </div>
  )
}

export default CrearEventoPage