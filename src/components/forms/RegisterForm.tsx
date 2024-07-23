import { useForm } from "react-hook-form"
import { CreateUser } from "../../interface/usuario"
import { registerRequest } from "../../api/auth"
import { toast } from "react-toastify"

const RegisterForm = () => {


const {handleSubmit, register, watch, formState: { errors }} = useForm<{
  nombre: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  cedula: string;
  sector: string;
}>()
    

    const handleForm = async(data: any) => {
        try {
      
            const dataUser:CreateUser = {
                cedula: data.cedula,
                username:data.username,
                password: data.password,
                email: data.email,
                rol: "USER",
                nombre: data.nombre,
                sector: data.sector,
            } 
            const res = await registerRequest(dataUser)
            if(res.data.error){
              toast.error(res.data.error)
            }else{
              toast.success(res.data.success)
            }
          
        } catch (error) {
            console.log(error)
        }
    }


return (

    <div className="flex justify-center items-center ">

        <form onSubmit={handleSubmit(handleForm)} className="max-w-sm space-y-5 py-10 px-10 border  rounded-md shadow-xl">
               <div className="relative">
                 <input type="text"  className="border peer p-4 block w-full border-gray-200 rounded-lg text-xl placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder=""
    {...register("nombre")}
    />
    <label htmlFor="hs-floating-input-email" className="absolute top-0 start-0 p-4 h-full  truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0]  peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Nombre completo</label>
     </div>
            <div className="relative">
                 <input type="text"  className="border peer p-4 block w-full border-gray-200 rounded-lg text-xl placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder=""
    {...register("username")}
    />
    <label htmlFor="hs-floating-input-email" className="absolute top-0 start-0 p-4 h-full  truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0]  peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Username</label>
     </div>

      <div className="relative">
                 <input type="email"  className="border peer p-4 block w-full border-gray-200 rounded-lg text-xl placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="you@mec.gub.uy"
    {...register("email")}
    />
    <label htmlFor="hs-floating-input-email" className="absolute top-0 start-0 p-4 h-full  truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0]  peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Email</label>
     </div>
     
      <div className="relative">
                 <input type="password"  className="border peer p-4 block w-full border-gray-200 rounded-lg text-xl placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder=""
    {...register("password")}
    />
    <label htmlFor="hs-floating-input-email" className="absolute top-0 start-0 p-4 h-full  truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0]  peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Contraseña</label>
     </div>


     <div className="relative">
                 <input type="password"  className="border peer p-4 block w-full border-gray-200 rounded-lg text-xl placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder=""
    {...register("confirmPassword", {
      validate: value => value === watch("password") || "Las contraseñas no coinciden"
    })}
    />
     {errors.confirmPassword ? 
     <span className="text-red-700 flex gap-1  ">
      <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z">
                </path>
            </svg>
      {errors.confirmPassword.message}.
      </span> 
        : null}
    <label htmlFor="hs-floating-input-email" className="absolute top-0 start-0 p-4 h-full  truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0]  peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Confirmar contraseña</label>
     </div>


      <div className="relative">
                 <input type="text"  className="border peer p-4 block w-full border-gray-200 rounded-lg text-xl placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder=""
    {...register("cedula")}
    />
    <label htmlFor="hs-floating-input-email" className="absolute top-0 start-0 p-4 h-full  truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0]  peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Cedula</label>
     </div>

     <div className="relative">
                 <input type="text"  className="border peer p-4 block w-full border-gray-200 rounded-lg text-xl placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder=""
    {...register("sector")}
    />
    <label htmlFor="hs-floating-input-email" className="absolute top-0 start-0 p-4 h-full  truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0]  peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Sector</label>
     </div>
     <div >
                    <button type="submit" className="px-3 py-1 dark:bg-white dark:text-black rounded-md border font-medium text-xl w-64  shadow-xl text-white bg-neutral-800 hover:bg-neutral-700">Crear cuenta</button>
     </div>

        </form>
    </div>
  )
}

export default RegisterForm