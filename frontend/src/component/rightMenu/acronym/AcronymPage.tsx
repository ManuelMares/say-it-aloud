import AcronymInput from "./AcronymInput.tsx"
import Acronym from "./Acronym.tsx"
import  AcronymDictionary from "../../../ALOUDpackage/AcronymDictionary"
import { useState } from "react"
// import Delay from "../../generic/Delay.tsx"
import AcronymWaitingPage from "./AcronymWaitingPage.tsx"
import pinIcon from '../../../icons/pin_blue.png';
import unpinIcon from '../../../icons/pin_grey.png';
import { IAcronymDictionary } from "./Acronmy_interface.tsx"
import { Tag, TagLabel } from "@chakra-ui/react"


export default function AcronymPage (){
    const [dictionary]   = useState<IAcronymDictionary>(AcronymDictionary);
    console.log(dictionary)
    //This is a dummy variable just so we can show something on screen while we wait.
    //it is set to true when we reload the acronym dictionary, and set back to false after loading the file
    const [update, setUpdate]   = useState<boolean>(false);
    //This function was sent as a callback to the Acronym component
    function updateAcronymDictionary(){  setUpdate(true);      }


    /*
        This DOM tree is displayed while waiting to reload the acronym dictionary
    */
    if(update) return <AcronymWaitingPage/>


    /*
        This DOM tree is displayed by default.
        It shows the pinned elements
    */
    else
        return (
            <div className="h-100 w-100">
                <div className="h-100">
                
                            <Tag size='md' p="2" my="2" variant='subtle' colorScheme='cyan'>
                                <img className="acronym-icon-size"  src={pinIcon}  alt="pinIcon"></img>
                                <TagLabel mx="2">Pinned</TagLabel>
                            </Tag>
                    <div className="simple-scroll flex-grow-1" style={{maxHeight: "40%"}}>
                        <div>

                            {/* This section renders the pinned elements */}
                            <div className="w-100 p-1 d-flex flex-nowrap">
                                <div className="d-flex flex-column gap-3 w-100" >{
                                    Object.keys(dictionary).map( (key:string) => {
                                        if(dictionary[key].pinnedstatus == true){
                                            const acronymData = {...dictionary[key]};
                                            return <Acronym updateAcronymDictionary={updateAcronymDictionary} key={dictionary[key].id} acronymData={acronymData}/>
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* This sections renders the unpinned elements */}
                            <Tag size='md' p="2" my="2" variant='subtle' colorScheme='cyan'>
                                <img className="acronym-icon-size"  src={unpinIcon}  alt="pinIcon"></img>
                                <TagLabel mx="2">Non-Pinned</TagLabel>
                            </Tag>
                    <div className="simple-scroll d-flex flex-grow-1 mt-4" style={{maxHeight: "40%"}}>
                        <div>

                            {/* <div className="w-100 p-1 invisible-scroll d-flex flex-nowrap" style={{maxHeight: "250px"}}> */}
                            <div className="w-100 p-1 flex-nowrap h-100">
                                <div className="d-flex flex-column gap-3 w-100">{/* This section holds list of unpinned acronyms*/
                                    
                                    Object.keys(dictionary).map( (key:string) => {
                                        if(dictionary[key].pinnedstatus == false){
                                            const acronymData = {...dictionary[key]};
                                            return <Acronym updateAcronymDictionary={updateAcronymDictionary} key={dictionary[key].id} acronymData={acronymData}/>
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                </div> 

                
                {/* This is the bottom section: will hold input */}
                <div className="h-10"> 
                    <AcronymInput/>
                </div>
                
            </div>
        )
}

//TODO
// next steps: make input component or list of inputs
// create a component that houses the list of elements - render the components in the list
// find a way to read the acronym dictionary