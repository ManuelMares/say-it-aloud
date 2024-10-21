import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { LegacyRef, useRef } from 'react';


interface Props{
    //useState variable that control the opening of the alert
    //When calling this component, [isOpen, setIsOpen] must be declared as a setState variable
    //To trigger the modal, it is enough to do: setIsOpen(true) from the parent component
    //To close the modal, although the same method can be use (setIsOpen(false)), the close and accept buttons already handle those cases
    isOpen              : boolean,
    setIsOpen           : (value: boolean | ((prevVar: boolean) => boolean)) => void,


    /*callbacks*/
    //triggered when click on 'cancel'
    onCancelCallback?    : ()=>void,
    //triggered when click on 'accept'
    onAcceptCallback?    : ()=>void,
    //triggered when click on 'open'
    onOpenCallback?     : ()=>void,

    /*properties*/
    title               : string,
    messageBody         : string,
    acceptButtonMessage : string,
    cancelButtonMessage : string,
}
export default function Alert(props:Props){    
    /*
        This alert accept onClose and onOpen callback functions
        to extend their functionality; that is, besides opening and closing the modal, 
        it is possible to trigger a given function as well. 
    */
       
    //Global variables
    const cancelRef = useRef() as  LegacyRef<HTMLButtonElement>;

    //This function is trigger when the modal is close (by accepting or canceling)
    function handleOnCancel(){
        //executes the callback function only if it exists
        if(props.onCancelCallback)
            props.onCancelCallback();
    
        //closes the modal
        props.setIsOpen(false);
    }
    //This function is trigger when the modal is close (by accepting or canceling)
    function handleOnAccept(){
        //executes the callback function only if it exists
        if(props.onAcceptCallback)
            props.onAcceptCallback();

        //closes the modal
        props.setIsOpen(false);
    }
    


    return(     
        <div >      
            <AlertDialog
                isOpen={props.isOpen}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                leastDestructiveRef={cancelRef}
                onClose={()=>{props.setIsOpen(false);}}
                >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {props.title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {props.messageBody}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            {/* Cancel button with callback */}
                            <Button ref={cancelRef} onClick={() => {handleOnCancel(); }}>
                                {props.cancelButtonMessage}
                            </Button>
                            
                            {/* Accept button with callback */}
                            <Button colorScheme='red' onClick={() => {handleOnAccept(); }} ml={3}>
                                {props.acceptButtonMessage}
                            </Button>
                        </AlertDialogFooter>


                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>       
    )
}