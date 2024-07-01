import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

const EventoForm = () => {
  const { handleSubmit, register } = useForm();

  const [file, setFile] = useState<File | null>(null);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleForm = async (data: any) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('evento[imagen]', file);
      }
      formData.append('nombre_evento', data.nombre_evento);
      formData.append('descripcion', data.descripcion);
      formData.append('fecha_evento', data.fecha_evento);
      formData.append('entradas', data.entradas);

      // Aquí puedes enviar formData a tu backend
      // Ejemplo: await axios.post('/api/eventos', formData);
       //await crearEvento(formData)
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-4/12 m-auto border ">
      <h1 className="text-center font-medium text-4xl text-white">Crear Evento</h1>
      <form onSubmit={handleSubmit(handleForm)} className="gap-10 flex flex-col p-8">
        <div className="relative mt-10">
          <input
            type="text"
            placeholder="Nombre del Evento"
            className="peer py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500"
            {...register('nombre_evento', {required: true})}
          />
        </div>

        <div className="relative mt-10">
          <textarea
            placeholder="Descripción"
            className="peer py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500"
            {...register('descripcion', {required: true})}
          />
        </div>

        <div className="relative mt-10">
          <input
            type="date"
            placeholder="Fecha del Evento"
            className="peer py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500"
            {...register('fecha_evento', {required: true})}
          />
        </div>

        <div className="relative mt-10">
          <input
            type="number"
            placeholder="Entradas"
            className="peer py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500"
            {...register('entradas', {required: true})}
          />
        </div>

        <div className="relative mt-10">
          <input
            type="file"
            onChange={handleFileChange}
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
