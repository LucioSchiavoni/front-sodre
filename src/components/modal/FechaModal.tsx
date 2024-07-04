import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { toast } from "react-toastify";
import { CrearParticipante } from "../../interface/participante";
import { useState } from "react";

interface FechaProps {
    fecha: string[];
    eventoId: number;
    userId: number;
}


const FechaModal: React.FC<FechaProps> = ({fecha, eventoId, userId}) => {



    const { isOpen, onOpen, onClose } = useDisclosure() 

    const handleParticipante = async() => {
        try {
          const dataPart: CrearParticipante = {
            usuarioId: userId,
            eventoId: eventoId,
            fecha_participante: fecha  
          }
          console.log("los datos del user: ", dataPart)
          // await crearParticipante(dataPart)
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <>
    <Button onClick={onOpen}>
        Abrir
    </Button>
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Titulo Fechas</ModalHeader>
        <div className="text-center">
            <aside className="flex flex-col">
                {fecha}
            </aside>
            <p >Evento id: {eventoId}</p>
            <p>User id: {userId}</p>
            <aside className="p-3 flex flex-col gap-2">
                    <p>Numero de entradas</p>
            <select name="cantidad_entradas" id="" className="px-3 py-1 border rounded-md shadow-xl w-24 m-auto">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            </aside>
        
        </div>
        <ModalCloseButton/>
        <ModalBody>
            <ModalFooter>
                <div className="gap-4 flex">
                <button className="border shadow-xl px-3 py-1 rounded-md bg-gray-100" onClick={handleParticipante}>Enviar</button>
                <button className="border shadow-xl px-3 py-1 rounded-md bg-gray-100" onClick={onClose}>Cerrar</button>
                </div>

            </ModalFooter>
        </ModalBody>
        </ModalContent>
    </Modal>
     </>

  )
}

export default FechaModal