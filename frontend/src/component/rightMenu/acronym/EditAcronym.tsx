import {useState, useRef, useEffect, ChangeEvent} from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Toasts from '../../generic/Toasts';
import { IAcronym } from './Acronmy_interface';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const eel = window.eel;



interface Props{
    updateAcronymDictionary: () => void,
    key: string;
    acronymData: IAcronym,
}

export default function AcronymInput(props: Props) {
    
    const focusRef = useRef<HTMLInputElement | null >(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [isValid, setIsValid] = useState<boolean>(false);
    const [isValidAcronym, setIsValidAcronym] = useState<boolean>(false);
    const [isValidAcronymDefinition, setIsValidAcronymDefinition] = useState<boolean>(false);
    const [acronym, setAcronym] = useState<string>("");
    const [acronymDefinition, setAcronymDefinition] = useState<string>("");
    const { SuccessToast } = Toasts();
    const { ErrorToast } = Toasts();


    function validateAcronym(text: string){
        if( text.length == 0 || text.length > 15){
            setIsValidAcronym(false);
            setAcronym("");
            return;
        }
        if(text.indexOf(' ') >= 0){
            setIsValidAcronym(false);   
            setAcronym("");
            return;         
        }
        setIsValidAcronym(true);
        setAcronym(text);

    }

    function validateAcronymDefinition(text: string){
        if( text.length == 0){
            setIsValidAcronymDefinition(false);
            setAcronymDefinition("");
            return;
        }
        setIsValidAcronymDefinition(true);
        setAcronymDefinition(text)
        
    }

    useEffect(() => {
        console.log("updating the status: ", isValidAcronym, isValidAcronymDefinition)
        setIsValid(isValidAcronym && isValidAcronymDefinition);      
    }, [isValidAcronym, isValidAcronymDefinition])
    


    // This function will call eel function add and add the user input into the database of acronyms
    async function handleSubmit() {
        if(acronym == "" || acronymDefinition == "")
        {
            ErrorToast({title:"Error creating an acronym", message:"The acronym definition is invalid. Please correct your inputs."});
            return;
        }
            
        const newAcronym = {
            id: props.acronymData.id,
            acronym: acronym,
            definition: acronymDefinition,
            pinnedstatus: props.acronymData.pinnedstatus
        }
        const answer = await eel.acronym_add(newAcronym)();


        if(answer){
            SuccessToast({title:"Acronym updated successfully", message:"You can start using your new acronym now."})        
            onClose();
        } 
        else       
            ErrorToast({title:"Error while editing the acronym", message:"Please make sure the acronym is new and it has not been defined before."})
    }

    return (
        <div>
            {/* When clicked, the '+' button will open a modal for the addition of more acronyms */}
            <MenuItem onClick={()=>{onOpen()}}> Edit </MenuItem>
            {/* When clicked, the '+' button will open a modal for the addition of more acronyms */}
            {/* <Button onClick={()=>{onOpen()}}> <img className="p-2 acronym-icon-size" src={moreIcon} alt="moreIcon" ></img></Button> */}

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} closeOnOverlayClick={true}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader> Edit Acronym </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={2}>
                        <FormControl isInvalid={!isValid}>
                            <label>
                                Requirements:
                                <ul>
                                    <li>The ACRONYM has no white spaces</li>
                                    <li>The ACRONYM is between 1 and 15 characters long</li>
                                    <li>The ACRONYM DEFINITION is at least one character long</li>
                                </ul>
                            </label>

                            <FormLabel className='font-medium'>Acronym from {props.acronymData.name} to:</FormLabel>
                            <Input
                                isInvalid = {!isValidAcronym}
                                errorBorderColor='crimson'
                                variant='outline'
                                placeholder='Acronym'
                                ref={focusRef}
                                type="acronym"
                                id="acronymInput"
                                name="acroynm"
                                marginBottom={4}
                                required
                                onChange={(e:ChangeEvent<HTMLInputElement>)=>validateAcronym(e.target.value)}
                                />

                            <FormLabel>Definition from {props.acronymData.description} to :</FormLabel>
                            <Input
                                isInvalid = {!isValidAcronymDefinition}
                                errorBorderColor='crimson'
                                variant='outline'
                                placeholder='Definition'
                                ref={focusRef}
                                type="definition"
                                id="definitionInput"
                                name="definition"
                                required
                                onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>)=>validateAcronymDefinition(e.currentTarget.value)}
                            />
                            <FormErrorMessage >
                                please review the format
                            </FormErrorMessage>

                    </FormControl>
                    </ModalBody>
                    <ModalFooter display='flex' justifyContent="space-between">
                        {/* This will save the new acronym to the database */}
                        <button d-flex="true" onClick={()=>{
                            handleSubmit();
                        }}> Save </button>

                        {/* This closes the modal. */}
                        <button d-flex="true" onClick={onClose}>Cancel</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};






