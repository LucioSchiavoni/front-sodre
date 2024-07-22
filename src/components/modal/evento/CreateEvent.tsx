import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, DrawerHeader, Stack, DrawerFooter, useDisclosure, Tooltip } from '@chakra-ui/react'
import { MdOutlineLibraryAdd } from "react-icons/md";
import EventoForm from '../../forms/EventoForm';


 const CreateEvent = () => {


  const {onOpen, isOpen, onClose} = useDisclosure()
  return (
    <>

    <Tooltip label="Crear evento">
       <button className='px-4 py-1 text-xl rounded-md flex gap-2 items-center mt-2  dark:bg-white dark:text-black font-semibold bg-neutral-900 text-white' onClick={onOpen}>
   Publicar <MdOutlineLibraryAdd/>
  </button>
    </Tooltip>
  
  <Drawer    isOpen={isOpen}
    placement='right'
    onClose={onClose}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader borderBottomWidth='1px'>
        Publicar un nuevo evento
      </DrawerHeader>

      <DrawerBody>
        <Stack spacing='24px'>
     
            <EventoForm/>
       

          
        </Stack>
      </DrawerBody>

      <DrawerFooter borderTopWidth='1px'>
        <Button variant='outline' mr={3} onClick={onClose}>
          Cancel
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  </>
  )
}


export default CreateEvent;