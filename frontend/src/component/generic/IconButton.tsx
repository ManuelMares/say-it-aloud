import { PlacementWithLogical, Tooltip,  IconButton as ChakraIconButton, Image } from "@chakra-ui/react";

interface Props{
    callback:           ()=>void,
    image:              string,
    altName:            string,
    tooltipName?:       string,
    tooltipDirection?:  PlacementWithLogical,
    bg?:                string,
    bgHover?:           string,
    bgActive?:          string,
}
export default function IconButton(props:Props){
    return(
        <Tooltip hasArrow label={props.tooltipName} placement={props.tooltipDirection} color='white' isDisabled={!props.tooltipName}>
            <ChakraIconButton
                aria-label={'icon-button-'+props.altName}
                p="0"
                m="2px"
                minW="0"
                w="2.5rem"
                h="2.5rem"
                borderRadius="100%"
                bg={props.bg ? props.bg : "transparent"}
                _hover={{bg: props.bgHover ? props.bgHover : "aloudBlue.1" }}
                _active={{bg: props.bgActive ? props.bgActive : "aloudBlue.4" }}
                onClick={() => {props.callback()}}
            >
                <Image
                    w="1.5rem" 
                    h="1.5rem" 
                    src={props.image} 
                    alt={props.altName} 
                />
            </ChakraIconButton>
        </Tooltip>
    )

        
}