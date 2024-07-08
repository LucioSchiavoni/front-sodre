import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import ButtonLayout from '../../utils/ButtonLayout'
import { Participante } from '../../interface/participante';
import { useQuery } from '@tanstack/react-query';
import { participanteByIdEvento } from '../../api/participante';

interface EventoId {
    id: number;
}

const ParticipantesModal: React.FC<EventoId> = ({id}) => {


        const {data, isLoading} = useQuery<Participante[]>({
        queryKey: ["id", id],
        queryFn: () => participanteByIdEvento(id),
        enabled: !!id
    })


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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
   <ModalContent>


         <h2 className='text-center mt-2 text-2xl font-medium'>Titulo</h2>
          <ModalCloseButton />
         <ModalBody>
            <div className='px-3 py-2 flex flex-col'>
               { data.map((item: Participante, index: number) => (
                <>
               
                <div key={index} className='flex gap-5 bg-gray-100'>
                    <p>{item.usuario.nombre}</p>
                    <p>{item.usuario.sector}</p>
                        <aside className=' '>
                {item.fecha_seleccionada.map((item, index) =>(
                    <div  key={index}>
                        <p>{item.fecha}</p>
                    </div>
                ))}
                </aside>
                </div>

            
                 </>
               ))}
            </div>
         </ModalBody>

          <div className='px-10 flex gap-10 py-5'>
         <ButtonLayout content='Cerrar' onClick={onClose} />
               <ButtonLayout content='Enviar' />
          </div>
    </ModalContent>
      </Modal>
    </>
  )
}

export default ParticipantesModal