
import { Link } from 'react-router-dom'
import LoginForm from '../components/forms/LoginForm'

const LoginPage = () => {
  return (
    <div className=''>
      <Link to='/' className='absolute top-10 left-10 rounded-md border px-3 py-1  font-medium w-28 text-center text-xl'>Volver</Link>
        <LoginForm />
    </div>
  )
}

export default LoginPage