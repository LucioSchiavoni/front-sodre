import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import ButtonLayout from '../../utils/ButtonLayout'
import { Participante } from '../../interface/participante';
import { useQuery } from '@tanstack/react-query';
import { participanteByIdEvento } from '../../api/participante';
import { obtenerFecha } from '../../utils/FechaFormat';
import { generarGanadoresRequest } from '../../api/ganadores';
import AcordionModal from './AcordionModal';

interface EventoId {
    id: number;
}

interface GanadoresProps {
  eventoId: number;
  numGanadores: number;
}

const ParticipantesModal: React.FC<EventoId> = ({id}) => {


        const {data, isLoading} = useQuery<Participante[]>({
        queryKey: ["id", id],
        queryFn: () => participanteByIdEvento(id),
        enabled: !!id
    })

    const eventoId = id;

    const handleClick = async(data: GanadoresProps) => {
      try {
          
          return generarGanadoresRequest(data)
      } catch (error) {
        console.log(error)
      }
    }


      const { isOpen, onOpen, onClose } = useDisclosure()

      if(isLoading)
        return(
    <div>
        Cargando..
    </div>
        )

    if(data)
  return (
     <>
      <Button onClick={onOpen}>Abrir Participantes</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay />
   <ModalContent>
         <h2 className='text-center mt-8 text-2xl font-medium'>Participantes del sorteo</h2>
          <ModalCloseButton />
         <ModalBody>

            <div className='px-3 py-2 flex flex-col' style={{maxHeight: '60vh', overflowY:'auto'}}>
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
               { data.map((item: Participante, index: number) => (
                <>

      <Tr key={index}>
     
        <Td className='capitalize'>{item.usuario.nombre}</Td>
        <Td className='capitalize'>{item.usuario.sector}</Td>
        <Td className='' textAlign="center">{item.cantidad_entradas}</Td>
        <Td className='flex gap-2 px-6'>{item.fecha_seleccionada.map((item, index) => (
          <span className='flex py-2 capitalize' key={index}>{obtenerFecha(item.fecha)} </span>

        ))}</Td>
     
      </Tr> 
      
</>
     
               ))}    
  </Tbody>
  </Table>
</TableContainer>
            </div>
         </ModalBody>
         <div className='px-10 flex flex-col gap-10 py-5'>
          <div className='flex gap-4'> 
   <ButtonLayout content='Enviar' typeButton={"submit"} onClick={handleClick} />
      <ButtonLayout content='Cerrar' onClick={onClose} /> 
            </div>  
 
       <div>
      <AcordionModal eventoId={eventoId}/>
       </div>

      </div>

               
           


    </ModalContent>
      </Modal>
    </>
  )
}

export default ParticipantesModal