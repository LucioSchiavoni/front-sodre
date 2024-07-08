import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getGanadoresRequest } from '../../api/ganadores'
import { Ganadores } from '../../interface/ganadores'


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

    if (!data || !Array.isArray(data)) {
        return (
            <div>
                <p className='text-3xl text-black'>Sin ganadores aun.</p>
            </div>
        );
    }

    if(data)
  return (
    <>
    <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' className='font-medium text-xl px-4'>
          Ganadores
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} className='flex'>
                    <TableContainer>
  <Table variant='simple'>
   
    <Thead>
      <Tr>
        <Th>Nombre</Th>
        <Th>Sector</Th>
        <Th >Cedula</Th>
        <Th>Opciones</Th>
       
      </Tr>
    </Thead>
    <Tbody>
      {
        data.map((item: Ganadores, index: number) => (
                   
      <Tr key={index}>
        <Td>{item.usuario.nombre}</Td>
        <Td>{item.usuario.cedula}</Td>
        <Td>{item.usuario.sector}</Td>
        <div className='flex gap-2 mt-2'>
                   <button className='px-3 py-1 border rounded-md '>Enviar</button>
        <button className='px-3 py-1 border rounded-md'>Eliminar</button>
        </div>
 
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