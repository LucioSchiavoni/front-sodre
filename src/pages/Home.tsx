import { Link } from "react-router-dom"


const Home = () => {
  return (
    <div>

        <h1 className="text-2xl font-semibold text-center">
        Bienvenido!!
            </h1>

        <Link to='/login' className="px-3 py-1 rounded-md absolute top-0 left-10 border shadow-xl mt-4 w-24 text-center">
        Login
        </Link>
    </div>
  )
}

export default Home