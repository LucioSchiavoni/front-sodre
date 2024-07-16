import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import ButtonLayout from '../../../utils/ButtonLayout';
import { Participante } from '../../../interface/participante';
import { useQuery } from '@tanstack/react-query';
import { participanteByIdEvento } from '../../../api/participante';
import { obtenerFecha } from '../../../utils/FechaFormat';
import { generarGanadoresRequest } from '../../../api/ganadores';
import AcordionModal from '../ganadores/AcordionModal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ScrollShadow } from '@nextui-org/react';


interface EventoId {
  id: number;
  entradas: number;
}

interface GanadoresProps {
  eventoId: number;
  numGanadores: number;
}

const ParticipantesModal: React.FC<EventoId> = ({ id, entradas }) => {
  const { data, isLoading, isError } = useQuery<Participante[]>({
    queryKey: ["id", id],
    queryFn: () => participanteByIdEvento(id),
    enabled: !!id
  });

  const { handleSubmit, register, formState: { errors }  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const eventoId = id;

  const handleSorteo = async (formData: any) => {
    try {
      const dataJson: GanadoresProps = {
        eventoId: eventoId,
        numGanadores: formData.numGanadores
      };
      const result = await generarGanadoresRequest(dataJson);
      toast.success(result.data.success);
    } catch (error) {
      console.log(error);
      toast.error("Error al generar los ganadores");
    }finally{
      window.location.reload();
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar los participantes</div>;
  }

  if (!data || data.length === 0) {
    return null
  }

  return (
    <>
      <button onClick={onOpen} className='rounded-md bg-neutral-800 px-6 py-1 font-medium text-2xl'>Ver participantes</button>

      <Modal isOpen={isOpen} onClose={onClose} size='4xl' >
        <ModalOverlay />
        <ModalContent className='dark:bg-neutral-900 dark:text-white'>
          <h2 className='text-center mt-8 text-2xl font-medium'>Participantes del sorteo</h2>
          <ModalCloseButton />
          <ModalBody>
            <div className='px-3 py-2 flex flex-col ' style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <TableContainer>
                 <ScrollShadow 
                      //hideScrollBar
                      offset={100}
                      orientation='horizontal'
                      className='max-w-[900px] max-h-[300px] '
                      >
                <Table size='sm'>
                  <Thead >
                    <tr className='dark:text-white'>
                      <th>Nombre del participante</th>
                      <th>Sector</th>
                      <th >Cantidad de entradas</th>
                      <th>Fechas seleccionada</th>
                    </tr>
                  </Thead>
                  <Tbody>  {data.map((item: Participante, index: number) => (
                      <Tr key={index}>
                        <Td className='capitalize'>{item.usuario.nombre}</Td>
                        <Td className='capitalize'>{item.usuario.sector}</Td>
                        <Td textAlign="center">{item.cantidad_entradas}</Td>
                        <Td className='flex gap-2 px-6'>
                          {item.fecha_seleccionada.map((fechaItem, fechaIndex) => (
                            <span className='flex py-2 capitalize' key={fechaIndex}>{obtenerFecha(fechaItem.fecha)}</span>
                          ))}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                   </ScrollShadow>
              </TableContainer>
            </div>
          </ModalBody>
          <div className='px-10 flex flex-col gap-10 py-5  '>
            <div className='flex gap-4  p-3 rounded-md '>
              <form onSubmit={handleSubmit(handleSorteo)} className=' flex  '>
                <aside className='flex flex-col gap-3'>
                    <label htmlFor="numGanadores" className='font-medium'>Número de ganadores</label>
                   
                <input type="number" className='px-3 py-1 rounded border w-64' id='numGanadores' {...register('numGanadores', { required: true, valueAsNumber: true, 
                  validate:{lessThanHundred: (value) =>  parseInt(value) <= entradas}
                })} /> 
            {errors?.numGanadores?.type == "lessThanHundred" && (
     <span className=' font-medium text-neutral-700 w-10/12'> La cantidad de ganadores no puede ser mas de {entradas}</span>
  )}
                <span>Cantidad entradas: {entradas}</span>
                </aside>
              
                <div className='absolute  left-80 mt-9 ml-5'>
                  <button className='px-3 py-1 rounded-md border font-medium' type='submit'>Generar sorteo</button>
                </div>          
                      
              </form>
            </div>
            <div>
              {/* Datos de ganadores */}
 <AcordionModal eventoId={eventoId}  />
          
             
            </div>
          </div>
          <div className='px-10 py-2 ml-10 flex justify-end '>
<ButtonLayout content='Cerrar' onClick={onClose}  />
          </div>
          
        </ModalContent>
      </Modal>
    </>
  );
};

export default ParticipantesModal;
