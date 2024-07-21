import {  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { toast } from "react-toastify";
import { CrearParticipante } from "../../interface/participante";
import { useState } from "react";
import { obtenerFecha } from "../../utils/FechaFormat";
import { crearParticipante } from "../../api/participante";
import { Select } from '@chakra-ui/react'
import { MdOutlineDateRange } from "react-icons/md";


interface FechaProps {
    fechas: string[];
    eventoId: number;
    userId: number;
}


const FechaModal: React.FC<FechaProps> = ({fechas, eventoId, userId}) => {

    const [entradas, setEntradas] = useState("");
    const [checkFecha, setCheckFecha] = useState<string[]>([]);


    const { isOpen, onOpen, onClose } = useDisclosure() 

    const handleCheckboxChange = (fecha: string) => {
        setCheckFecha(prev => 
          prev.includes(fecha) ? prev.filter(item => item !== fecha) : [...prev, fecha]
        );
      };

    const handleParticipante = async() => {
        try {
          const data: CrearParticipante = {
            usuarioId: userId,
            eventoId: eventoId,
            fecha_participante: checkFecha,
            cantidad_entradas: parseInt(entradas)
          }
         const res = await crearParticipante(data)
         if(res.success){
            toast.success(res.success)
         }else{
            toast.info(res.error)
         }
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <>
    <button className="px-3 py-1 rounded-md shadow-md bg-neutral-900 text-xl font-medium" onClick={onOpen}>
       Participar en el sorteo
    </button>
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>

        <div className="px-8 p-9 flex flex-col gap-5">
            <aside className="flex flex-col ">
               
            {fechas.length === 1 ? <>
            <div className="text-center p-8 text-2xl font-semibold">
              Desea participar del sorteo?
              </div></>  : 
<>
               <p className="mb-2 font-semibold flex text-2xl gap-1 items-center"> Seleccione las fechas que desea ir</p>
              {fechas.map((fechaItem, index) => (
          <div key={index} className="flex gap-2 items-center font-semibold capitalize">
             <input 
                    type="checkbox" 
                    value={fechaItem} 
                    onChange={() => handleCheckboxChange(fechaItem)} 
                    checked={checkFecha.includes(fechaItem)}
                  />
             {obtenerFecha(fechaItem)} <span className=""><MdOutlineDateRange/></span> 
            </div>
        ))}
        
        </>}
            </aside>
     
        </div>
        <ModalCloseButton/>
        <ModalBody>
            <ModalFooter>
                <div className="gap-4 flex">
                <button className="border shadow-xl px-3 py-1 rounded-md bg-gray-100" onClick={handleParticipante}>Confirmar</button>
                <button className="border shadow-xl px-3 py-1 rounded-md bg-gray-100" onClick={onClose}>Cancelar</button>
                </div>

            </ModalFooter>
        </ModalBody>
        </ModalContent>
    </Modal>
     </>

  )
}

export default FechaModal