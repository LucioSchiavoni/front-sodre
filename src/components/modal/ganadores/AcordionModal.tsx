import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getGanadoresRequest } from '../../../api/ganadores'
import { Ganadores } from '../../../interface/ganadores'



interface IdProps {
    eventoId: number
}

const AcordionModal: React.FC<IdProps> = ({eventoId}) => {


    const {data, isLoading} = useQuery<Ganadores[]>({
        queryKey: ["eventoId", eventoId],
        queryFn: () => getGanadoresRequest(eventoId)

    })

    if(isLoading)
        return(
    <div>
        Cargando...
    </div>
    )

    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div>
                <p className='text-xl text-center text-gray-700'>Sin ganadores aun.</p>
            </div>
        );
    }

    if(data)
  return (
    <>
    <Accordion defaultIndex={[0]} allowMultiple className='border rounded-md '>
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
      <Tr>
        <Th>Nombre</Th>
        <Th>Email</Th>
        <Th >Enviar correo</Th>
        <Th>Borrar ganador</Th>
       
      </Tr>
    </Thead>
    <Tbody>
      {
        data.map((item: Ganadores, index: number) => (
      <Tr key={index} className=''>
        <Td className='capitalize'>{item.usuario.nombre}</Td> 
        <Td>{item.usuario.email}</Td>
     <Td> <button className='px-3 py-1 border rounded-md'>Enviar </button></Td>  
    <Td><button className='px-3 py-1 border rounded-md'>Eliminar</button></Td>    
      
      </Tr>
        ))
      } 
      </Tbody>
  </Table>
</TableContainer>
   
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
    </>
  )
}

export default AcordionModal