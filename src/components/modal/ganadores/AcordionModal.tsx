import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Skeleton, Stack, Table, TableContainer, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteGanadoresRequest, getGanadoresRequest, sendEmailRequest } from '../../../api/ganadores'
import { Ganadores } from '../../../interface/ganadores'
import { toast } from 'react-toastify'
import { MdDelete } from 'react-icons/md'





interface IdProps {
    eventoId: number;
}

const AcordionModal: React.FC<IdProps> = ({eventoId}) => {



    const {data, isLoading} = useQuery<Ganadores[]>({
        queryKey: ["ganadores", eventoId],
        queryFn: () => getGanadoresRequest(eventoId)

    })



    const handleSend = async(nombre: string, email:string) => {
      try {
        const res = await sendEmailRequest(nombre, email)
        toast.info(res.message)
      } catch (error) {
        console.log(error)
      }
    }

    

    const queryClient = useQueryClient()
   

    const handleDelete = async(id: number) => {
      try {
        const res = await deleteGanadoresRequest(id)
        toast.info(res?.data.message)
        queryClient.invalidateQueries({
          queryKey: ['ganadores', eventoId],
          exact: true,
        })
      } catch (error) {
        console.log(error)
      }
    }

    if(isLoading)
        return(
   <>
        <Stack>
      <Skeleton height='20px'/>
      <Skeleton height='20px'/>
      <Skeleton height='20px'/>
    </Stack>
   </>
    )

    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div>
                <p className='text-xl text-center text-gray-500'>Sin ganadores aun.</p>
            </div>
        );
    }

    if(data)
  return (
    <>
    <Accordion defaultIndex={[0]} allowMultiple className=' rounded-md '>
  <AccordionItem className=''>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' className='font-medium text-xl px-4'>
          Ganadores
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} >
    <TableContainer>
  <Table variant='simple' className=''>
    <Thead>
      <Tr  >
        <Th className='dark:text-white'>Nombre</Th>
        
        <Th className='dark:text-white'>Enviar correo</Th>
        <Th className='dark:text-white'>Borrar ganador</Th>
       
      </Tr>
    </Thead>
    <tbody className=''>
      {
        data.map((item: Ganadores, index: number) => (
      <Tr key={index} className='dark:text-white '>
        <Td className='capitalize'>{item.usuario.nombre}</Td> 
 
     <Td> <button className='px-3 py-1 border dark:border-neutral-700 dark:hover:bg-neutral-700 hover:bg-gray-200 rounded-md' onClick={() => handleSend(item.usuario.nombre, item.usuario.email || "")}>Enviar </button></Td>  
    <Td><button className='px-3 py-1 border rounded-md flex items-center text-xl dark:border-neutral-700 dark:hover:bg-neutral-700 hover:bg-gray-200' onClick={() => handleDelete(item.id)}> <MdDelete/></button></Td>    
      
      </Tr>
        ))
      } 
      </tbody>
  </Table>
</TableContainer>
   
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
    </>
  )
}

export default AcordionModal