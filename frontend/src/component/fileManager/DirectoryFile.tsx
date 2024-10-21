import React, { useState } from 'react';
import fileIcon from "../../icons/file.png";
import fileIconGrey from "../../icons/file_grey.png";
import renameIcon from "../../icons/rename_white.png";
import deleteIcon from "../../icons/delete_white.png";
import Toasts from '../generic/Toasts';
import Alert from '../generic/Alert';
import IconButton from '../generic/IconButton';
import { Box, Button, Image, Input, Text } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const eel = window.eel;

interface Props{
    fileName:string;
    path:string;
    openFile: (path:string)=>void;
    refresh: ()=>void;
    isOpen: boolean;
}
export default function DirectoryFile(props: Props){
    const { WarningToast, SuccessToast } = Toasts();
    const [rename, setRename] = useState<boolean>(false);
    const [onHover, setOnHover] = useState<boolean>(false);
    /*This next two variables are used in the confirmation to delete an element*/
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const cancelRef = useRef() as  LegacyRef<HTMLButtonElement>;

    /*
        Removes a text file and refreshes the interface
    */
    function deleteFile(){
        eel.remove_file(props.path);
        props.refresh();
        WarningToast({
            title: 'File deleted',
            message: 'With the name: ' + props.path,
        });
    }
    function Rename(){
        setRename(true);
    }
    function OpenAlert(){
        setIsOpen(true);
    }


    function renameFile(event: React.KeyboardEvent){
        if(event.key.localeCompare("Enter") == 0){
            //HTMLElement is not recognized by Ts, so it has to be casted into an HTMLInputElement
            const fileInput = document.getElementById("NewFileName") as HTMLInputElement;                 
            let fileName = fileInput.value;
            
            if(fileName.includes(".")){
                if(!fileName.includes(".txt")){
                    fileInput.style.backgroundColor = "#f1b2b2";
                    return;                    
                }    
            }
            else
                fileName += ".txt";

            eel.rename_file(fileName, props.path)(( isCreated: boolean ) => {
                if(isCreated){
                    setRename(false);
                    props.refresh();
                    SuccessToast({
                        title: 'File Renamed',
                        message: 'The file has been renamed to: ' + fileName,
                    });
                }
                else{
                    fileInput.style.backgroundColor = "#f1b2b2";
                    WarningToast({
                        title: 'Error renaming file',
                        message: 'An unexpected file name has been provided, or the file already exists. Please try a different name',
                    });
                }
            })
        }
    }

    //This section renders the opened files  in the editor 
    if(props.isOpen){
        return(
            
            <Box 
                px="5px"
                py="0x"
                m="5px"
                borderRadius="md"
                w="calc(100% - 10px)"
                h="calc(2.5rem + 4px)"
                display="flex"
                alignItems="center"
                justifyContent="start"
                bg="white"
                shadow="lg"
            >
                <Image
                    w="1.5rem" 
                    h="1.5rem" 
                    src={fileIconGrey} 
                    alt="folder_icon" 
                />
                <Text
                    py="0"
                    px="4px"
                    m="0"
                    fontWeight="600"
                    overflow="hidden"
                    flexWrap="nowrap"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                >
                    {props.fileName}
                </Text>
            </Box>
        )
    }


    // hides the rename and delete button that appear on hover with a delay 
    //This is used when an alert appears and the onMouseLeave does not work
    // function delayOnHoverOut() {
    //     setTimeout(()=>{
    //         setOnHover(false);
    //     }, 200);
    // }

    //This return renders a file that is not opened
    return(
        <Box 
            px="5px"
            py="0x"
            m="5px"
            borderRadius="md"
            w="calc(100% - 10px)"
            h="calc(2.5rem + 4px)"
            display="flex"
            alignItems="center"
            justifyContent="start"
            _hover={{ bg : "aloudBlue.4" }}            
            onContextMenu={ ()=> {} }   
            onMouseEnter={ () => {setOnHover(true) }} 
            onMouseLeave={ () => {setOnHover(false) }}
        >
            {/* This alert dialog only shows when deleting the object */}            
            <Alert 
                    isOpen                ={isOpen}
                    setIsOpen             ={setIsOpen}
                    title                 ="Delete File" 
                    messageBody           ='Are you sure? You CANNOT undo this action afterwards.' 
                    cancelButtonMessage   ="cancel"
                    acceptButtonMessage   ='Delete' 
                    onAcceptCallback      ={deleteFile}
            />
            <Button
                p="0"
                m="0"
                minW={0}
                minH={0}
                w="auto"
                h="100%"
                display="flex"
                flex={1}
                alignItems="center"
                justifyContent="start"
                bg="transparent"
                _hover={{bg:"transparent"}}
                _active={{bg:"transparent"}}
                onClick={()=> {                    
                    if(!rename){ setOnHover(false); props.openFile(props.path) }
                }}
            >
            
                <Image
                    w="1.5rem" 
                    h="1.5rem" 
                    src={fileIcon} 
                    alt="folder_icon" 
                />
                
                {
                    rename 
                    ?
                        <Input 
                            bg="white"
                            p="4px"
                            m="0"
                            mx="5px"
                            borderRadius="md"
                            h="75%"
                            id="NewFileName"
                            autoFocus
                            placeholder={props.fileName} 
                            onKeyDown={ (event:React.KeyboardEvent<HTMLInputElement>)=>{renameFile(event);} }  
                            onBlur={ ()=>{setRename(false);} }
                        />
                    :
                        <Text
                            py="0"
                            px="10px"
                            m="0"
                            h="full"
                            color="white"
                            fontWeight="600"
                            flexWrap="nowrap"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            alignContent="center"
                        textOverflow="ellipsis"
                        >
                            {props.fileName}
                        </Text>
                }
            </Button>
            
            {  
                (!rename && onHover) &&
                <>
                    <IconButton callback={Rename} image={renameIcon} altName={'rename'} tooltipName={"Rename"} />
                    <IconButton callback={OpenAlert} image={deleteIcon} altName={'delete'} tooltipName={"Delete"} />
                </>
            }
        
        </Box>
    )
}