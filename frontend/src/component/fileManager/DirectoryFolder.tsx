import React, { useState } from 'react';
import folderIcon from "../../icons/folder.png";
import renameIcon from "../../icons/rename_white.png";
import deleteIcon from "../../icons/delete_white.png";
import Toasts from '../generic/Toasts';
import {
    Button,
    Box,
    Image,
    Text,
    Input,
  } from '@chakra-ui/react'
import Alert from '../generic/Alert';
import IconButton from '../generic/IconButton';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const eel = window.eel;



interface Props{
    fileName:string;
    path:string;
    openFolder: (path:string)=>void;
    refresh: ()=>void;
}
export default function DirectoryFolder(props: Props){
    const { WarningToast, SuccessToast,  } = Toasts();
    const [rename, setRename] = useState<boolean>(false);
    const [onHover, setOnHover] = useState<boolean>(false);
    /*This next two variables are used in the confirmation to delete an element*/
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const cancelRef = useRef() as  LegacyRef<HTMLButtonElement>;

    function deleteFolder(){
        eel.remove_folder(props.path);
        props.refresh();
        WarningToast({
            title: 'Folder deleted',
            message: 'With the name: ' + props.path,
        });
    }
    
    // hides the rename and delete button that appear on hover with a delay 
    //This is used when an alert appears and the onMouseLeave does not work
    // function delayOnHoverOut() {
    //     setTimeout(()=>{
    //         setOnHover(false);
    //     }, 200);
    // }

    function Rename(){
        setRename(true);
    }
    function OpenAlert(){
        setIsOpen(true);
    }
    
    function renameFolder(event: React.KeyboardEvent){
        if(event.key.localeCompare("Enter") == 0){
            const folderInput = document.getElementById("NewFolderName")  as HTMLInputElement;

            eel.rename_folder(folderInput.value, props.path)(( isCreated: boolean ) => {
                if(isCreated){
                    setRename(false);
                    props.refresh();
                    SuccessToast({
                        title: 'Folder Renamed',
                        message: 'The folder name hsa been updated to: ' + folderInput.value,
                    });
                }
                else{
                    folderInput.style.backgroundColor = "#f1b2b2";
                    WarningToast({
                        title: 'Error renaming folder',
                        message: 'An unexpected folder name has been provided, or the folder already exists. Please try a different name',
                    });
                }
            })
        }
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
            onMouseEnter={ () => {setOnHover(true) }} 
            onMouseLeave={ () => {setOnHover(false) }}
        >
            {/* This alert dialog only shows when deleting the object */}
            
            <Alert 
                    isOpen                ={isOpen}
                    setIsOpen             ={setIsOpen}
                    title                 ="Delete folder" 
                    messageBody           ='Are you sure? You CANNOT undo this action afterwards.' 
                    cancelButtonMessage   ="cancel"
                    acceptButtonMessage   ='Delete' 
                    onAcceptCallback      ={deleteFolder}
            />
            
            <Button
                p="0"
                m="0"
                minW={0}
                minH={0}
                w="auto"
                h="auto"
                display="flex"
                flex={1}
                alignItems="center"
                justifyContent="start"
                bg="transparent"
                _hover={{bg:"transparent"}}
                _active={{bg:"transparent"}}
                onClick={()=> {                    
                    if(!rename){ props.openFolder(props.path) }
                }}
            >
                <Image
                    w="2rem" 
                    h="1.5rem" 
                    src={folderIcon} 
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
                                id="NewFolderName"
                                autoFocus
                                placeholder={props.fileName} 
                                onKeyDown={ (event:React.KeyboardEvent<HTMLInputElement>)=>{renameFolder(event);} }  

                                onBlur={ ()=>{setRename(false);} }
                            />
                        :
                            <Text
                                py="0"
                                px="4px"
                                m="0"
                                color="white"
                                fontWeight="600"
                                overflow="hidden"
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