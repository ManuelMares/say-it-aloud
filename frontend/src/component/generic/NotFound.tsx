import WriteItAloud from '../../icons/Write_it_aloud2.png';
import { Box, Image } from '@chakra-ui/react';

interface IProps{
  message: string
}
export default function NotFound(props:IProps){
    return(
        // Empty braces allows to bypass the restriction of a single returned HTML object
        <Box 
          p="10%"
          m={0}
          w="100%" 
          h="100%" 
          borderRadius="md" 
          bgColor="white" 
          shadow="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
        >
          <Image src={WriteItAloud} alt='ALOUD! logotype' />
            {props.message}
        </Box>
    )
}