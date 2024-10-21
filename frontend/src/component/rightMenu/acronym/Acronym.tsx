import { Menu, MenuButton, MenuList, Tooltip } from "@chakra-ui/react";
import playIcon from '../../../icons/play_blue.png';
import pinIcon from '../../../icons/pin_blue.png';
import unpinIcon from '../../../icons/pin_grey.png';
import moreIcon from '../../../icons/more2_blue.png';
import DeleteAcronym from "./DeleteAcronym";
import EditAcronym from "./EditAcronym";
import Toasts from '../../generic/Toasts';
import { IAcronym } from "./Acronmy_interface";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const eel = window.eel;

interface Props {
    //This function can be called when the acronym dictionary is updated in any way. It will refresh the interface
    updateAcronymDictionary: () => void,
    key: string;
    acronymData: IAcronym,
}

export default function Acronym (props: Props){
    //creating a deep copy of the props object
    const acronym_data = {...props.acronymData}
    console.log(acronym_data)
    const { ErrorToast }           = Toasts();

    function playAcronym(){
        console.log(props.acronymData.description)
        eel.compiler_compile(props.acronymData.description)( (answer:boolean) => {
            if(!answer){        
                ErrorToast({
                  title: "Error compiling Acronym",
                  message: "The acronym voice format is not valid.",
                })
            }
          });
    }


    return (
        <div className="w-100 p-1 d-flex flex-row align-items-center justify-content-center border border-1 rounded-3 " style={{fontSize: "14px",}}>
            {/* Play Icon */}
            <Tooltip hasArrow label='Play Acronym' placement="top" color='white'>
                <button  className="wia-button" style={{width: "40px !important", height: "40px"}}  onClick={()=>{ playAcronym()}}>
                    <img className="acronym-icon-size" src={playIcon} alt="play" ></img>
                </button>
            </Tooltip>


            <div className="acronym d-flex flex-grow-1 mx-3 gap-2" style={{maxWidth: "calc( 100% - 120px )"}}>
                {/* This is the acronym */}
                    <label className="py-2 text-start text-nowrap fw-bold m-0 simple-scroll"  style={{width: "90%"}}>
                        {acronym_data.name}
                    </label>

                {/* This is the description of the acronym */}
                    <p className="py-2 text-start text-nowrap m-0 simple-scroll" style={{width: "90%"}}>
                        {acronym_data.description}
                    </p>
            </div>
            <div className="d-flex flex-row flex-nowrap">


                {/* Pin Icon */}
                <Tooltip hasArrow label='Pin Acronym' placement="top" color='white'>
                    <button  className="wia-button d-flex"  style={{width: "40px"}}    onClick={()=>{
                        //when pinned button clicked, update the dictionary and indicate to parent to reload the file
                        acronym_data.pinnedstatus = !acronym_data.pinnedstatus;
                        eel.acronym_edit(acronym_data);
                        //updates the interface by reloading the dictionary
                        props.updateAcronymDictionary();
                                                        }}>
                        <img className="acronym-icon-size"
                            src={acronym_data.pinnedstatus ? pinIcon : unpinIcon} //blue icon if pinned, grey if unpinned
                            alt="pinIcon">
                        </img>
                    </button>
                </Tooltip>

                {/* Edit Icon */}
                <Tooltip hasArrow label='Edit Acronym Properties' placement="left-end" color='white'>
                    <div style={{width: "40px"}}>
                        <Menu>
                            <MenuButton
                                px={3}
                                py={2}
                                transition='all 0.2s'
                                borderRadius='md'
                                _hover={{bg : 'gray.100'}}
                                _expanded={{ bg: 'gray.100'}}
                                _focus={{boxShadow: 'outline'}}
                                >
                                <img className="acronym-icon-size" src={moreIcon} alt="moreIcon" ></img>
                            </MenuButton>
                            <MenuList>
                                {/* <MenuItem> Edit </MenuItem>
                                <MenuItem> Delete </MenuItem> */}
                                <EditAcronym updateAcronymDictionary={props.updateAcronymDictionary} key={acronym_data['id']} acronymData={acronym_data}/>
                                <DeleteAcronym updateAcronymDictionary={props.updateAcronymDictionary} key={acronym_data['id']} acronymData={acronym_data}/>
                            </MenuList>
                        </Menu>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}
