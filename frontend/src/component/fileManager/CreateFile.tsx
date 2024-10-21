import React from 'react';
import fileIcon from "../../icons/file_white.png";
import Toasts from '../generic/Toasts';
import { Box, Image, Input } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const eel = window.eel

interface Props{
    cancelCreation: ()=>void;
    directory: string;
    refresh: ()=>void;
}
export default function CreateFile(props: Props){
    const { WarningToast, SuccessToast } = Toasts();

    /*
        Detects the 'Enter' input to create a folder

        This function validates the name
    */
    function createFile(event: React.KeyboardEvent){
        if(event.key.localeCompare("Enter") == 0){
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
            
            


            eel.create_file(fileName, props.directory)(( isCreated: boolean ) => {
                if(isCreated){
                    props.cancelCreation();
                    props.refresh();
                    SuccessToast({
                        title: 'File Created',
                        message: 'With the name: ' + fileName,
                    });
                }
                else{
                    fileInput.style.backgroundColor = "#f1b2b2";
                    WarningToast({
                        title:'Error creating file',
                        message: 'An unexpected file name has been provided, or the file already exists. Please try a different name.'
                    })
                }
            })
        }
    }
    function AbortCreation(){
        props.cancelCreation();
        WarningToast({
            title:'File Cancelled',
            message: 'The file creation process got interrupted'
        })
    }

    return(
        <Box 
            px="5px"
            py="0x"
            m="0"
            borderRadius="md"
            w="calc(100% - 10px)"
            h="calc(2.5rem + 4px)"
            display="flex"
            alignItems="center"
            justifyContent="start"
            _hover={{ bg : "aloudBlue.4" }}            
            onContextMenu={ ()=> {} }
        >
                <Image
                    w="2rem" 
                    h="1.5rem" 
                    src={fileIcon} 
                    alt="file_icon" 
                />
                <Input 
                    bg="white"
                    p="4px"
                    m="0"
                    mx="5px"
                    borderRadius="md"
                    h="75%"
                    id="NewFileName"
                    placeholder="New Folder" 
                    autoFocus 
                    onKeyDown={(event:React.KeyboardEvent<HTMLInputElement>)=>{createFile(event);}}  
                    onBlur={()=>{AbortCreation();}}
                />
            
        </Box> 
    )
}