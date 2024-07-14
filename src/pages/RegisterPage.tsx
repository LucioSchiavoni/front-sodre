
import { Link } from 'react-router-dom'
import RegisterForm from '../components/forms/RegisterForm'

const RegisterPage = () => {
  return (
    <div>
        <Link to='/' className='px-3 py-1 rounded-md border font-medium absolute top-10 left-10 w-28 text-center text-xl hover:bg-gray-100'>Volver</Link>
        <RegisterForm/>
        </div>
  )
}

export default RegisterPage