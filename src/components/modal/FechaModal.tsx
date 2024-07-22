import {  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { toast } from "react-toastify";
import { CrearParticipante } from "../../interface/participante";
import { useState } from "react";
import { obtenerFecha } from "../../utils/FechaFormat";
import { crearParticipante } from "../../api/participante";
import { MdOutlineDateRange } from "react-icons/md";




interface FechaProps {
    fechas: string[];
    eventoId: number;
    userId: number;
}


const FechaModal: React.FC<FechaProps> = ({fechas, eventoId, userId}) => {

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
          }
         const res = await crearParticipante(data)
         if(res.success){
            toast.success(res.success)
            onClose();
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

        <div className="px-4 p-5 flex flex-col gap-5">
            <aside className="flex flex-col ">
               
            {fechas.length === 1 ? <>
            <div className="text-3xl font-semibold ">
              <p className="text-center">Participar del sorteo?</p>
              {fechas.map((item, index) => (
                <div key={index}>
                    <div className=" text-2xl  mt-5 flex flex-col  gap-3 p-2">
                       <p className="text-start">Fecha de la función</p> 
                    <div className="flex items-center font-thin gap-2">
                     <span className=""><MdOutlineDateRange/></span> {obtenerFecha(item)}
                      </div> </div>
                </div>
              ))}
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
                <button className="border shadow-xl px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200" onClick={handleParticipante}>Confirmar</button>
                <button className="border shadow-xl px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200" onClick={onClose}>Cancelar</button>
                </div>

            </ModalFooter>
        </ModalBody>
        </ModalContent>
    </Modal>
     </>

  )
}

export default FechaModal