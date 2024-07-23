import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Table, TableContainer, Tbody, Td, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import ButtonLayout from '../../../utils/ButtonLayout';
import { Participante } from '../../../interface/participante';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { participanteByIdEvento } from '../../../api/participante';
import { generarGanadoresRequest } from '../../../api/ganadores';
import AcordionModal from '../ganadores/AcordionModal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ScrollShadow } from '@nextui-org/react';
import { IoTicket } from "react-icons/io5";
import { Skeleton, Stack } from '@chakra-ui/react'
import { FaUser } from "react-icons/fa";


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
    queryKey: ["participante", id],
    queryFn: () => participanteByIdEvento(id),
    enabled: !!id
  });

  const { handleSubmit, register, formState: { errors }  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const eventoId = id;

  const queryClient = useQueryClient()

  const handleSorteo = async (data: any) => {
    try {
  
      const dataJson: GanadoresProps = {
        eventoId: eventoId,
        numGanadores: data.numGanadores,
      };
      const result = await generarGanadoresRequest(dataJson);
      toast.success(result?.data.success);
      queryClient.invalidateQueries({
        queryKey: ['ganadores', eventoId],
        exact:true
      })
    } catch (error) {
      console.log(error);
      toast.error("Error al generar los ganadores");
    }
  };

  if (isLoading) {
    return <>
    <button onClick={onOpen} className='rounded-md bg-neutral-800 px-6 py-1 font-medium text-2xl flex items-center gap-2'>Ver participantes <span className='text-xl'><FaUser/></span></button>   
    <Modal isOpen={isOpen} onClose={onClose} size='4xl'  > 
    <ModalOverlay/>
    <ModalContent className='p-6'>
        <ModalCloseButton/>
      <Stack>
      <Skeleton height='20px'/>
      <Skeleton height='20px'/>
      <Skeleton height='20px'/>
      </Stack>
      </ModalContent>
    </Modal>
    </>
  };

  if (isError) {
    return <div>Error al cargar los participantes</div>;
  }

  if (!data || data.length === 0) {
    return <> 
    <button onClick={onOpen} className='rounded-md bg-neutral-900 px-6 py-1 font-medium text-2xl flex items-center gap-2'>Ver participantes <span><FaUser/></span></button>
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay/>
      <ModalContent className='p-6'>
  
        <ModalCloseButton/>
        <div>
          <p className='text-center text-gray-700 mt-4 text-2xl'> Sin participantes actualmente.</p>
         
        </div>
      </ModalContent>
      
    </Modal>
    </>
  }

 if(data) 
  return (
    <>
    
      <button onClick={onOpen} className='rounded-md bg-neutral-800 px-6 py-1 font-medium text-2xl flex items-center gap-2'>Ver participantes <span className='text-xl'><FaUser/></span></button>

      <Modal isOpen={isOpen} onClose={onClose} size='4xl'  >
        <ModalOverlay />
        <ModalContent className='dark:bg-neutral-900 dark:text-white '>
          <h2 className='text-center mt-8 text-2xl font-medium'>Participantes del sorteo</h2>
          <ModalCloseButton />
          <ModalBody>
            <div className='px-3 py-2 flex flex-col ' style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <TableContainer>
                 <ScrollShadow 
                      // hideScrollBar
                      offset={100}
                      orientation='horizontal'
                      className='max-w-[900px] max-h-[300px] '
                      >
                <Table size='md'>
                  <Thead >
                    <tr className='dark:text-white  '>
                      <th className='text-start px-3'>Nombre del participante</th>

                    
                    </tr>
                  </Thead>
                  <Tbody>  {data.map((item: Participante, index: number) => (
                      <Tr key={index}  className='capitalize '>
                        <Td className='px-4 py-1'>{item.usuario.nombre}</Td>
                        
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
                   
                <input type="number" className='px-3 py-1 text-black rounded border w-64' id='numGanadores' {...register('numGanadores', { required: true, valueAsNumber: true, 
                  validate:{lessThanHundred: (value) =>  parseInt(value) <= entradas}
                })} /> 
            {errors?.numGanadores?.type == "lessThanHundred" && (
     <span className=' font-medium text-neutral-700 w-10/12'> La cantidad de ganadores no puede ser mas de {entradas}</span>
  )}

    
                <span className='flex gap-2 items-center text-xl'>Cantidad entradas: {entradas} <IoTicket/></span>
                </aside>
              
                <div className='absolute  left-80 mt-9 ml-5'>
                  <button className='px-3 py-1 rounded-md border dark:border-neutral-700 dark:hover:bg-neutral-700 font-medium flex gap-2' type='submit'>Generar sorteo <span className='text-center mt-1  text-xl'><IoTicket/></span></button>
                </div>          
                      
              </form>
            </div>
            <div>
              {/* Datos de ganadores */}
        
            <AcordionModal eventoId={eventoId}  /> 
           
            </div>
          </div>
          <div className=' py-2  px-8 flex justify-end '>
          <ButtonLayout content='Cerrar' onClick={onClose}  />
          </div>
          
        </ModalContent>
      </Modal>
    </>
  );
};

export default ParticipantesModal;
