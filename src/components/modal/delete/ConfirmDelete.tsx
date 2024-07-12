import { Button, Modal, ModalOverlay, ModalContent , ModalCloseButton, useDisclosure} from '@chakra-ui/react'
import { MdDelete } from "react-icons/md";

interface DeleteProps {
    onClick: any
}


const ConfirmDelete: React.FC<DeleteProps> = ({onClick}) => {


    const {onOpen, isOpen, onClose} = useDisclosure()

  return (
    <>
         <Button onClick={onOpen} className='hover:bg-red-500'><span className=""><MdDelete/></span></Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <h2 className='text-xl text-center p-3 '>Borrar evento</h2>
    <ModalCloseButton />
    <div className='px-8'>
    <p className=' '>Estas seguro de que desea eliminar este evento?</p>
    </div>

    <div className='flex gap-2 p-4 '>
        <button onClick={onClick} className='px-3 py-1 rounded-md border'>Eliminar</button>  
        <button className='px-3 py-1 rounded-md border'  onClick={onClose}>
        Cancelar
      </button>
    </div>
  </ModalContent>
</Modal>
    </>
  )
}

export default ConfirmDelete