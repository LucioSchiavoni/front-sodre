import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import ButtonLayout from '../../../utils/ButtonLayout';
import { Participante } from '../../../interface/participante';
import { useQuery } from '@tanstack/react-query';
import { participanteByIdEvento } from '../../../api/participante';
import { obtenerFecha } from '../../../utils/FechaFormat';
import { generarGanadoresRequest } from '../../../api/ganadores';
import AcordionModal from '../ganadores/AcordionModal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface EventoId {
  id: number;
}

interface GanadoresProps {
  eventoId: number;
  numGanadores: number;
}

const ParticipantesModal: React.FC<EventoId> = ({ id }) => {
  const { data, isLoading, isError } = useQuery<Participante[]>({
    queryKey: ["id", id],
    queryFn: () => participanteByIdEvento(id),
    enabled: !!id
  });

  const { handleSubmit, register } = useForm();
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
      <Button onClick={onOpen}>Abrir Participantes</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <h2 className='text-center mt-8 text-2xl font-medium'>Participantes del sorteo</h2>
          <ModalCloseButton />
          <ModalBody>
            <div className='px-3 py-2 flex flex-col' style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <TableContainer>
                <Table size='sm'>
                  <Thead>
                    <Tr>
                      <Th>Nombre del participante</Th>
                      <Th>Sector</Th>
                      <Th isNumeric>Cantidad de entradas</Th>
                      <Th>Fechas seleccionada</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((item: Participante, index: number) => (
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
              </TableContainer>
            </div>
          </ModalBody>
          <div className='px-10 flex flex-col gap-10 py-5'>
            <div className='flex gap-4'>
              <form onSubmit={handleSubmit(handleSorteo)} className=' flex  '>
                <aside className='flex flex-col gap-3'>
                    <label htmlFor="numGanadores" className='font-medium'>Número de ganadores</label>
                <input type="number" className='px-3 py-1 rounded border w-64' id='numGanadores' {...register('numGanadores', { required: true, valueAsNumber: true })} />
                </aside>
              
                <div className=' mt-9 ml-5'>
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
<ButtonLayout content='Cerrar' onClick={onClose} />
          </div>
          
        </ModalContent>
      </Modal>
    </>
  );
};

export default ParticipantesModal;
