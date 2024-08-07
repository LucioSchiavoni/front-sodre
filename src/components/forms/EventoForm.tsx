import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { crearEventoRequest } from '../../api/evento';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { MdDateRange } from "react-icons/md";
import { useMutation, useQueryClient } from '@tanstack/react-query';


const EventoForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<{
    entradas:number;
    nombre_evento:string;
    descripcion: string;
  }>();

  const [file, setFile] = useState<File | null>(null);
  const [fechas, setFechas] = useState<{fecha: string, hora: string}[]>([{fecha: '', hora: ''}]);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };


  const handleFechaHoraChange = (index: number, value: string, type: 'fecha' | 'hora') => {
    const newFechas = [...fechas];
    newFechas[index][type] = value;
    setFechas(newFechas);
  };

  const addFecha = () => {
    setFechas([...fechas, {fecha: '', hora: ''}]);
  };

  const removeFecha = (index: number) => {
    const newFechas = fechas.filter((_, i) => i !== index);
    setFechas(newFechas);
  };

    const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:crearEventoRequest, 

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:['eventos'],
        exact:true
      });
      toast.success('Evento creado con éxito');
    },
    onError: (error) => {
      toast.error('Error al crear el evento');
      console.error(error);
    },
  });



  const handleForm = async (data: any) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('evento[imagen]', file);
      }
      formData.append('nombre_evento', data.nombre_evento);
      formData.append('descripcion', data.descripcion);
      formData.append('fechas_evento', JSON.stringify(fechas.map(f => `${f.fecha} ${f.hora}`)));
      formData.append('entradas', data.entradas);
      
      mutation.mutate(formData)
    } catch (error) {
      console.log(error);
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

          
            <div className=" mt-5 ">
            <label htmlFor="" className='font-semibold'>Fechas del evento</label>
            {fechas.map((fecha, index) => (
              <div key={index}>
                <div className="flex ">
                  <input
                    type="date"
                    placeholder="Fecha del Evento"
                    className="py-3 border px-4 block w-7/12 mt-2 border-gray-200 rounded-lg focus:border-neutral-800 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    value={fecha.fecha}
                    onChange={(e) => handleFechaHoraChange(index, e.target.value, 'fecha')}
                    required
                  />
                  <input
                    type="time"
                    placeholder="Hora del Evento"
                    className="py-3 border px-4 block w-6/12 mt-2 border-gray-200 rounded-lg focus:border-neutral-800 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    value={fecha.hora}
                    onChange={(e) => handleFechaHoraChange(index, e.target.value, 'hora')}
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="ml-2 px-2 py-2 text-xl hover:bg-red-400 rounded-md bg-red-500 text-white"
                      onClick={() => removeFecha(index)}
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>
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
                <button type='submit' className="w-full px-3 py-2 text-xl font-medium tracking-wide text-white  transition-colors duration-300 transform bg-neutral-800 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring focus:ring-opacity-50">
                   Crear evento
                </button>

            
            </div>
        </form>
    </div>
 
</section>
  );
};

export default EventoForm;



