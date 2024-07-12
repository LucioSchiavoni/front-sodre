import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { toast } from "react-toastify";
import { CrearParticipante } from "../../interface/participante";
import { useState } from "react";
import { obtenerFecha } from "../../utils/FechaFormat";
import { crearParticipante } from "../../api/participante";

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
    <Button onClick={onOpen}>
        Abrir
    </Button>
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Seleccione los datos para participar</ModalHeader>
        <div className="px-8 flex flex-col gap-5">
            <aside className="flex flex-col ">
                <p className="mb-2 font-semibold">Fechas que desea ir</p>
            {fechas.map((fechaItem, index) => (
          <div key={index} className="flex gap-2 font-semibold capitalize">
             <input 
                    type="checkbox" 
                    value={fechaItem} 
                    onChange={() => handleCheckboxChange(fechaItem)} 
                    checked={checkFecha.includes(fechaItem)}
                  />
            {obtenerFecha(fechaItem)}
            </div>
        ))}
            </aside>
            <aside className="flex-1">
                    <p className="mb-2 font-semibold">Numero de entradas</p>
            <select name="cantidad_entradas" value={entradas} onChange={ (e) => setEntradas(e.target.value)} id="cantidad_entradas" className="px-3 py-1 border rounded-md shadow-xl w-24 " required>
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