import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { crearEventoRequest } from '../../api/evento';

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

      await crearEventoRequest(formData)
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-4/12 m-auto border ">
      <h1 className="text-center font-medium text-4xl text-black mt-2">Crear Evento</h1>
      <form onSubmit={handleSubmit(handleForm)} className="gap-10 flex flex-col p-8">
        <div className="relative mt-2 flex flex-col gap-2">
          <label htmlFor="">Nombre del evento</label>
          <input
            type="text"
            placeholder="Nombre del Evento"
            className="peer py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500"
            {...register('nombre_evento', {required: true})}
          />
        </div>

        <div className="relative mt-2 flex flex-col gap-2">
          <label htmlFor="">Descripcion del evento</label>
          <textarea
            placeholder="Descripción"
            className="peer py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500" 
            {...register('descripcion', {required: true})}
          />
        </div>

        <div className="relative ">
        {fechas.map((fecha, index) => (
          <div className="relative mt-4 flex items-center" key={index}>
            <input
              type="date"
              placeholder="Fecha del Evento"
              className="peer py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500"
              value={fecha}
              onChange={(e) => handleFechaChange(index, e.target.value)}
            />
            {index > 0 && (
              <button
                type="button"
                className="ml-2 px-3 py-1 rounded-md bg-red-500 text-white"
                onClick={() => removeFecha(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          className="mt-2 px-3 py-1 rounded-md  text-black border shadow-xl"
          onClick={addFecha}
        >
          Añadir Fecha
        </button>
          
        </div>

        <div className="relative mt-3 gap-2 flex flex-col">
        <label htmlFor="" className=''>Numbero de entradas</label>
          <input
            type="text"
            placeholder="Entradas"
            className="peer py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500"
            {...register('entradas', {required: true})}
          />
        </div>

        <div className="relative mt-3">
          <label htmlFor="" className=''>Imagen del evento</label>
          <input
            type="file"
            name='imagen'
            onChange={handleFileChange}
            className='mt-3'
          />
        </div>

        <button type="submit" className="px-3 py-1 rounded-md bg-gray-50 hover:bg-gray-200 text-xl font-medium">
          Crear Evento
        </button>
      </form>
    </div>
  );
};

export default EventoForm;
