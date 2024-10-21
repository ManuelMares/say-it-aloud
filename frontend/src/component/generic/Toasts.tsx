import { useToast } from "@chakra-ui/react";

/* 
Returns Different types of toasts

@param title
    A string
@param message
    A string

@return
    A Js function NOT a component

Example:
first, import the default component as
import Toasts from '../Generic/Toasts'


Then, declare a global function. Indicate the exported function you wanna use. Notice that InfoToast is one of the exported functions
const { InfoToast } = Toasts();

Finally, whenever you need the toast, just call it
InfoToast({title:"File error", message:"he file could not be updated."})
*/


/*Interaces*/
interface Props{
    title: string,
    message: string,
}
export default function Toasts(){
    /* Global variables*/
    //Duration of the toast appearance in ms
    const DURATION_TIME_MS = 3000;
    //Can the toast be manually closed
    const IS_CLOSEABLE = true;
    // used to define the type of variable
    enum toast_types{
        SUCCESS = "success",
        ERROR   = "error",
        WARNING = "warning",
        INFO    = "info",
    }
    //Chakra-UI toast
    const toast = useToast();


    /*Exports*/
    function InfoToast(props:Props){
        toast({
            title: props.title,
            description: props.message,
            status: toast_types.INFO,
            duration: DURATION_TIME_MS,
            isClosable: IS_CLOSEABLE,
        })
    }
    function SuccessToast(props:Props){
        toast({
            title: props.title,
            description: props.message,
            status: toast_types.SUCCESS,
            duration: DURATION_TIME_MS,
            isClosable: IS_CLOSEABLE,
        })
    }
    function ErrorToast(props:Props){
        toast({
            title: props.title,
            description: props.message,
            status: toast_types.ERROR,
            duration: DURATION_TIME_MS,
            isClosable: IS_CLOSEABLE,
        })
    }
    function WarningToast(props:Props){
        toast({
            title: props.title,
            description: props.message,
            status: toast_types.WARNING,
            duration: DURATION_TIME_MS,
            isClosable: IS_CLOSEABLE,
        })
    }

    return{
        InfoToast,
        SuccessToast,
        ErrorToast,
        WarningToast,
    }

}

