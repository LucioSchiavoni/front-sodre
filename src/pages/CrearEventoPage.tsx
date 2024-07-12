import { Link } from "react-router-dom"
import EventoForm from "../components/forms/EventoForm"



const CrearEventoPage = () => {
  return (
    <div className="py-2">
    <Link to='/auth' className="absolute top-10 left-10  font-medium rounded-md border m-2 py-1 px-3 shadow-xl">
      Volver
      </Link>
      <article className="mt-4">
      <EventoForm/>
      </article>
    </div>
  
 
  )
}

export default CrearEventoPage