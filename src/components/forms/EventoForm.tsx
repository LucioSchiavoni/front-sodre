import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { crearEventoRequest } from '../../api/evento';
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';

const EventoForm = () => {
  const { handleSubmit, register } = useForm();

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
    }
  };

  return (
    <div className="w-4/12 m-auto border ">
      
      <form onSubmit={handleSubmit(handleForm)} className="gap-10 flex flex-col p-8">

        <div className="">
  <div className="flex justify-between items-center">
    <label htmlFor="with-corner-hint" className="block text-xl font-medium mb-2 dark:text-white">Titulo</label>
    <span className="block mb-2 text-sm text-gray-500 dark:text-neutral-500">Obligatorio</span>
  </div>
  <input type="text" id="with-corner-hint" className="py-3 border px-4 block w-full border-gray-200 rounded-lg  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"  {...register('nombre_evento', {required: true})}/>
</div>
        <div className="relative mt-2 flex flex-col gap-2">
        <label htmlFor="with-corner-hint" className="block text-xl font-medium mb-2 dark:text-white">Descripcion</label>
          <textarea
            placeholder="Descripción..."
            className="py-3 border px-4 block w-full  border-gray-200 rounded-lg  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
            {...register('descripcion', {required: true})}
          />
        </div>
        <div className="relative ">
        <label htmlFor="with-corner-hint" className="block text-xl font-medium mb-2 dark:text-white">Fechas de la funcion</label>
        
        {fechas.map((fecha, index) => (
        
        <div className="relative mt-4 flex items-center" key={index}>
            
            <input
              type="date"
              placeholder="Fecha del Evento"
              className="py-3 border px-4 block w-11/12  border-gray-200 rounded-lg  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              value={fecha}
              onChange={(e) => handleFechaChange(index, e.target.value)}
              required
            />
            
            {index > 0 && (
              <button
                type="button"
                className="ml-2 px-3 py-2 text-xl hover:bg-red-400 rounded-md bg-red-500 text-white"
                onClick={() => removeFecha(index)}
              >
                <MdDelete/>
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          className="mt-3 px-3 py-1 rounded-md text-black border"
          onClick={addFecha}
        >
          <span className='flex items-center gap-2 text-xl'>     
          Añadir Fecha
          <IoIosAddCircleOutline />
          </span>
       
        </button>
          
        </div>

        <div className="relative mt-3 gap-2 flex flex-col">
        <label htmlFor="with-corner-hint" className="block text-xl font-medium mb-2 dark:text-white">Numero de entradas</label>
          <input
            type="text"
            placeholder="Entradas"
            className="py-3 border px-4 block w-full  border-gray-200 rounded-lg  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            {...register('entradas', {required: true})}
          />
        </div>

        <div className="flex  gap-4 flex-col  ">
          <aside className='flex  gap-5'>
            <label  htmlFor="with-corner-hint" className=" text-xl font-medium mb-2 dark:text-white ">Imagen del evento</label>
            <span className="text-end mb-2 text-sm text-gray-500 dark:text-neutral-500 mt-2">Opcional</span>
          </aside>
          
          <input
            type="file"
            name='imagen'
            onChange={handleFileChange}
            className=''
          />
              
        </div>

        <button type="submit" className="px-3 py-1 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 text-xl font-medium">
          Crear evento
        </button>
      </form>
    </div>
  );
};

export default EventoForm;
