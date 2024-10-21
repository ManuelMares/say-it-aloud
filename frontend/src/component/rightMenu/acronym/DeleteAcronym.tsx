import {Button, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Toasts from '../../generic/Toasts';
import { IAcronym } from "./Acronmy_interface";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const eel = window.eel;

interface Props{
    updateAcronymDictionary: ()=>void,
    key: string;
    acronymData: IAcronym,
}


export default function DeleteAcronym(props: Props) {
    // const focusRef = useRef<HTMLInputElement | null >(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const { SuccessToast } = Toasts();
    const { ErrorToast } = Toasts();

    // This function will call eel function add and add the user input into the database of acronyms
    async function handleSubmit() {
        const acronym_data = {...props.acronymData}
        const answer = await eel.acronym_delete(acronym_data)();

        if(answer){
            SuccessToast({title:"Acronym created", message:"You can start using your new acronym now."})        
            onClose();
            props.updateAcronymDictionary();
        } 
        else       
            ErrorToast({title:"Error creating an acronym", message:"Please make sure the acronym has not been defined before"})
        

    }

    return (
        <div>
            {/* When clicked, the '+' button will open a modal for the addition of more acronyms */}
            <MenuItem onClick={()=>{onOpen()}}> Delete </MenuItem>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size='md'>
                <ModalOverlay/>
                <ModalContent display='flex'  >
                    <ModalHeader alignItems='center' letterSpacing='wide'> Are you sure you want to delete this acronym?  </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <b>Acronym:</b> {props.acronymData.name} <br></br> 
                        <b>Definition:</b> {props.acronymData.description}
                    </ModalBody>
                    <ModalFooter display='flex' justifyContent="space-between">
                        {/* This will delete the current acronym to the database */}
                        <Button pl={10} pr={10} onClick={()=>{
                            handleSubmit();
                            }}> Yes </Button>
                        <Button  pl={10} pr={10} onClick={onClose}> No </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};






