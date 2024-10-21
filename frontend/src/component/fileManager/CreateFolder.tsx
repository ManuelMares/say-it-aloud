import React from 'react';
import folderIcon from "../../icons/folder.png";
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
export default function CreateFolder(props: Props){
    const { WarningToast, SuccessToast } = Toasts();

    /*
        Detects the 'Enter' input to create a folder

        This function validates the name
    */
    function createFolder(event: React.KeyboardEvent){
        if(event.key.localeCompare("Enter") == 0){
            const folderInput = document.getElementById("NewFolderName") as HTMLInputElement;
            eel.create_folder(folderInput.value, props.directory)(( isCreated: boolean ) => {
                if( isCreated){
                    props.cancelCreation();
                    props.refresh();
                    SuccessToast({
                        title: 'Folder Created',
                        message: 'With the name: ' + folderInput.value,
                    });
                }
                else{
                    folderInput.style.backgroundColor = "#f1b2b2";
                    WarningToast({
                        title: 'Error creating folder',
                        message: 'An unexpected folder name has been provided, or the folder already exists. Please try a different name',
                    });
                }
            })
        }
    }
    function AbortCreation(){
        props.cancelCreation();
        WarningToast({
            title:'Folder Cancelled',
            message: 'The folder creation process got interrupted'
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
                    src={folderIcon} 
                    alt="folder_icon" 
                />
                <Input 
                    bg="white"
                    p="4px"
                    m="0"
                    mx="5px"
                    borderRadius="md"
                    h="75%"
                    id="NewFolderName"
                    placeholder="New Folder" 
                    autoFocus 
                    onKeyDown={(event:React.KeyboardEvent<HTMLInputElement>)=>{createFolder(event);}}  
                    onBlur={()=>{AbortCreation();}}
                />
            
        </Box>  
    )
}