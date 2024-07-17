import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { crearEventoRequest } from '../../api/evento';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { MdDateRange } from "react-icons/md";

const EventoForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<{
    entradas:number;
    nombre_evento:string;
    descripcion: string;
  }>();

  const [file, setFile] = useState<File | null>(null);
  const [fechas, setFechas] = useState<string[]>(['']);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleFechaChange = (index: number, value: string) => {
    const newFechas = [...fechas];
    newFechas[index] = value;
    setFechas(newFechas);
  };

  const addFecha = () => {
    setFechas([...fechas, '']);
  };

  const removeFecha = (index: number) => {
    const newFechas = fechas.filter((_, i) => i !== index);
    setFechas(newFechas);
  };

  const handleForm = async (data: any) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('evento[imagen]', file);
      }
      formData.append('nombre_evento', data.nombre_evento);
      formData.append('descripcion', data.descripcion);
      formData.append('fechas_evento', JSON.stringify(fechas));
      formData.append('entradas', data.entradas);

     const create = await crearEventoRequest(formData)
        toast.success(create.data.success)
    } catch (error) {
      console.log(error);
    }finally{
      setTimeout(() => (
        window.location.reload()
      ), 2000)
    }
  };
  return (
    <section className=" ">
    <div className=" flex justify-center mt-5 px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit(handleForm)}>
         

        <div>
            <label className="block mb-2 text-neutral-800 font-semibold">Titulo del evento</label>
                        <input type="text" id='nombre_evento' required {...register("nombre_evento", {required: true})} placeholder="" className="block w-full px-5 py-3 mt-2 text-black  bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600   dark:border-gray-700 focus:border-blue-400 dark:focus:border-neutral-800 focus:ring-neutral-900 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div className=" items-center mt-6">
               <label htmlFor="" className=' text-neutral-800 font-semibold'>Descripcion</label>
                <textarea  id='descripcion' required {...register('descripcion', {required: true})} className="block w-full px-3 mt-2 py-3 text-black bg-white border rounded-lg   dark:border-gray-600 focus:border-blue-400 dark:focus:border-neutral-900 focus:ring-neutral-900 focus:outline-none focus:ring focus:ring-opacity-40" > </textarea>
            </div>
            <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>

                <h2 className="px-2 text-gray-400">Imagen del evento</h2>

                <input id="dropzone-file" type="file" className="hidden" name='imagen'  onChange={handleFileChange}/>
            </label>

            <div className=" items-center mt-6">
               <label htmlFor="" className=' text-neutral-800 font-semibold'>Numero de entradas</label>
                <input type="text" id='entradas' required {...register('entradas', {required: true, 
                  validate: {
                    isNumber: value => !isNaN(value) || "Ingrese un numero valido"
                  }
                })} className="block w-full px-3 mt-2 py-3 text-black bg-white border rounded-lg   dark:border-gray-600 focus:border-blue-400 dark:focus:border-neutral-900 focus:ring-neutral-900 focus:outline-none focus:ring focus:ring-opacity-40" />
                {errors.entradas && <p>{errors.entradas.message}</p>}
            </div>

            <div className="relative mt-5">
        <label htmlFor="" className='font-semibold '>Fechas del evento</label>
        {fechas.map((fecha, index) => (
        
        <div className="relative  flex items-center" key={index}>
            
            <input
              type="date"
              placeholder="Fecha del Evento"
              className="py-3 border px-4 block w-9/12 mt-2 border-gray-200 rounded-lg  focus:border-neutral-800 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:border-neutral-700  dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              value={fecha}
              onChange={(e) => handleFechaChange(index, e.target.value)}
              required
            />
            
            {index > 0 && (
              <button
                type="button"
                className="ml-2 px-2 py-2 text-xl hover:bg-red-400 rounded-md bg-red-500 text-white"
                onClick={() => removeFecha(index)}
              >
                <MdDelete/>
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          className="mt-3 px-3 py-1 rounded-md  text-black border hover:bg-gray-200 transition-all"
          onClick={addFecha}
        >
          <span className='flex items-center  gap-2 '>     
          Agregar fecha
          <MdDateRange />
          </span>
       
        </button>
          
        </div>
            <div className="mt-6">
                <button type='submit' className="w-full px-3 py-2 text-xl font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-neutral-800 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring focus:ring-opacity-50">
                   Crear evento
                </button>

            
            </div>
        </form>
    </div>
</section>
  );
};

export default EventoForm;



