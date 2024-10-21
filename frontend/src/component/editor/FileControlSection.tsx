import saveIcon from '../../icons/save_blue.png';
import saveIconGrey from '../../icons/save_grey.png';
import speedIcon from '../../icons/speed_blue.png';
import volumneIcon from '../../icons/sound_blue.png';
import playIcon from '../../icons/play_blue.png';
import cleanPage from '../../icons/new_file.png';
import fileSettings from "../../icons/fileSettings_blue.png"
import infoIcon from "../../icons/info_blue.png";
import { ChangeEvent, useRef, useState } from "react";
import {AbsoluteCenter, Box, Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Switch, Tooltip, useDisclosure} from '@chakra-ui/react'
import  ATE_editor_settings from "../../ALOUDpackage/ATE_editor_settings"
import { IAIDE_editor_settings } from './AIDE_interfaces';
import IconButton from '../generic/IconButton';
import { HexColorPicker } from 'react-colorful';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const eel = window.eel;



// Dictionary variables for implementation
enum ReadingSpeeds{
    BY_SENTENCE     = "BY_SENTENCE",
    EVERY_2_WORDS   = "EVERY_2_WORDS",
    EVERY_3_WORDS   = "EVERY_3_WORDS",
    EVERY_4_WORDS   = "EVERY_4_WORDS",
    EVERY_WORD      = "EVERY_WORD",
    MANUALLY        = "MANUALLY",
}

interface Props{
    fileName: string,
    saveFile: ()=>void,
    hasFileChanges: boolean,
    updateSettings: ()=>void,
    isInteractive: boolean,
    setIsInteractive: (status:boolean)=>void,
    play: ()=>void,
    example: ()=>void,
    cleanPage: ()=>void,
    onSelectedSpeedChange: (value:string)=>void,
    isMinimized: boolean,
}
export default function FileControlSection(props:Props){
    // return <></>
    const [volume, setVolume] = useState<string>("50");   
    const [readingSpeed, setReadingSpeed] = useState<string>("bySentences"); //variable to store the reading speed dropdown value
    
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null);

  const [editorSettings]              = useState<IAIDE_editor_settings>(ATE_editor_settings);


    function handleReadingSpeedChange(value: string) {
        setReadingSpeed(value);
        props.onSelectedSpeedChange(value); 
    }



    const [fontSize, setFontSize]                                       = useState(editorSettings.fontSize);
    const [editorFontColor, setEditorFontColor]                         = useState(editorSettings.editor_fontColor);
    const [editorActiveFontColor, setEditorActiveFontColor]             = useState(editorSettings.editor_active_fontColor);
    const [editorBackgroundColor, setEditorBackgroundColor]             = useState(editorSettings.editor_backgroundColor);
    const [editorActiveBackgroundColor, setEditorActiveBackgroundColor] = useState(editorSettings.editor_active_backgroundColor);
    const [lineCounterFontColor, setLineCounterFontColor]               = useState(editorSettings.counter_fontColor);
    const [lineCounterBackgroundColor, setLineCounterBackgroundColor]   = useState(editorSettings.counter_backgroundColor);
    const [lineCounterShow, setLineCounterShow]                         = useState(editorSettings.counter_showCounter);


    function showLineCounter(e:ChangeEvent<HTMLInputElement>){
        setLineCounterShow(e.target.checked);
    }

    function update_editor_settings(){
        editorSettings.fontSize                         = fontSize;
        editorSettings.editor_fontColor                 = editorFontColor;   
        editorSettings.editor_active_fontColor          = editorActiveFontColor;           
        editorSettings.editor_backgroundColor           = editorBackgroundColor;           
        editorSettings.editor_active_backgroundColor    = editorActiveBackgroundColor;                   
        editorSettings.counter_fontColor                = lineCounterFontColor;       
        editorSettings.counter_backgroundColor          = lineCounterBackgroundColor;           
        editorSettings.counter_showCounter              = lineCounterShow;       

        eel.ATE_settings_update(editorSettings);
        onClose();
        props.updateSettings();
    }

    function updateFontSize(e:string){
        setFontSize(e)
    }

    return(
        <Flex 
            flex="0"
            mb="1rem"
            py="5px"
            px="20px"
            w="auto"
            h="auto"
            bg="white"
            borderRadius="40px"
            alignItems="center"
            justifyContent="center"
            shadow="lg"
        >   
            <IconButton bg="aloudWhite.1" bgHover="aloudWhite.2" bgActive="aloudwhite.3" altName='tutorial' callback={()=>{props.example()}} image={infoIcon} tooltipName='Aloud! tutorial'/>
            <IconButton bg="aloudWhite.1" bgHover="aloudWhite.2" bgActive="aloudwhite.3" altName='settings' callback={()=>{onOpen()}} image={fileSettings} tooltipName='AIDE Settings'/>
            <IconButton bg="aloudWhite.1" bgHover="aloudWhite.2" bgActive="aloudwhite.3" altName='save_icon' callback={() => props.saveFile()} image={props.hasFileChanges ? saveIcon : saveIconGrey} tooltipName={props.hasFileChanges ? 'Save Changes' : "Nothing to Save"}/>
            <IconButton bg="aloudWhite.1" bgHover="aloudWhite.2" bgActive="aloudwhite.3" altName='clean_page' callback={()=>{props.cleanPage()}} image={cleanPage} tooltipName='Clean Page'/>
                <Flex
                    overflow="auto" 
                    fontWeight="600"
                    className="simple-scroll"
                    m="0"
                    py="0"
                    px="10px"
                    fontSize="x-large"
                    flexWrap="nowrap"
                    whiteSpace="nowrap"
                    wordBreak="break-all"
                    textOverflow="ellipsis"
                    flex="1"
                    transition="width 0.5s ease-in-out"
                >
                    {props.fileName}
                </Flex>     
            <IconButton bg="aloudWhite.1" bgHover="aloudWhite.2" bgActive="aloudwhite.3" altName='read_aloud' callback={()=>{props.play()}} image={playIcon} tooltipName='Read Aloud'/>

        {   /* 
            =================================================================================================================================
            =================================================================================================================================
            =================================================================================================================================
            THIS SECTION CORRESPONDS TO THE DRAWER FOR THE SETTINGS OF AIDE
            Ts has a problem with Drawer. the correct way to fix it to correctly define the data type, but due to time, we by-passed it
            
            eslint-disable-next-line @typescript-eslint/ban-ts-comment
            @ts-expect-error
            */
        }
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} size={"md"}>
            <DrawerOverlay />
            <DrawerContent>
            {/* <DrawerCloseButton /> */}
            <DrawerHeader>            
                Editor Settings
            </DrawerHeader>

            <DrawerBody>
                {/* GENERAL SETTINGS */}
                <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4'>
                        General Settings
                    </AbsoluteCenter>
                </Box>

                {/* Font size */}
                <div className='d-flex flex-row align-items-center justify-content-start'>
                    <FormLabel>fontSize</FormLabel>
                    <NumberInput step={1} defaultValue={fontSize} min={10} max={20}  onChange={(e:string) => {updateFontSize(e)}}>
                        <NumberInputField  />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </div>



                {/* EDITOR SETTINGS */}
                <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4'>
                        Text Settings
                    </AbsoluteCenter>
                </Box>

                
                {/* font color */}
                <div className='d-flex my-2 flex-row align-items-center justify-content-start'>
                    <Popover>
                        <PopoverTrigger>
                                <Button backgroundColor={editorFontColor}></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Chose a font color for the editor</PopoverHeader>
                            <PopoverBody>
                                <HexColorPicker color={editorFontColor} onChange={setEditorFontColor} />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover> 

                    <FormLabel mb='0' mx="2">
                        Text Font Color
                    </FormLabel>
                </div>

                

                {/* background color */}                
                <div className='d-flex my-2 flex-row align-items-center justify-content-start'>
                    <Popover>
                        <PopoverTrigger>
                                <Button backgroundColor={editorBackgroundColor}></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Chose a background color for the text</PopoverHeader>
                            <PopoverBody>
                                <HexColorPicker color={editorBackgroundColor} onChange={setEditorBackgroundColor} />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover> 
                    
                    <FormLabel mx="2" mb='0'>
                        Editor Background Color
                    </FormLabel>
                </div>

                {/* active font color */}
                <div className='d-flex my-2 flex-row align-items-center justify-content-start'>
                    <Popover>
                        <PopoverTrigger>
                                <Button backgroundColor={editorActiveFontColor}></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Chose a font color for the active text</PopoverHeader>
                            <PopoverBody>
                            <HexColorPicker color={editorActiveFontColor} onChange={setEditorActiveFontColor} />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover> 
                    
                    <FormLabel mb='0' mx="2">
                        Editor Active Font Color
                    </FormLabel>
                </div>

                {/*Active background color */}
                <div className='d-flex my-2 flex-row align-items-center justify-content-start'>
                    <Popover>
                        <PopoverTrigger>
                                <Button backgroundColor={editorActiveBackgroundColor}></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Chose a background color for the active text</PopoverHeader>
                            <PopoverBody>
                                <HexColorPicker color={editorActiveBackgroundColor} onChange={setEditorActiveBackgroundColor} />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover> 
                    
                    <FormLabel mb='0' mx="2">
                        Editor Active Background Color
                    </FormLabel>
                </div>



                {/* Line counter */}                
                <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4'>
                        Line Counter Settings
                    </AbsoluteCenter>
                </Box>


                {/*font color */}
                <div className='d-flex my-2 flex-row align-items-center justify-content-start'>
                    <Popover>
                        <PopoverTrigger>
                                <Button backgroundColor={lineCounterFontColor}></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Chose a font color for the line counter</PopoverHeader>
                            <PopoverBody>
                            <HexColorPicker color={lineCounterFontColor} onChange={setLineCounterFontColor} />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover> 
                    
                    <FormLabel mb='0' mx="2">
                        line counter font Color
                    </FormLabel>
                </div>


                {/*background color */}
                <div className='d-flex my-2 flex-row align-items-center justify-content-start'>
                    <Popover>
                        <PopoverTrigger>
                                <Button backgroundColor={lineCounterBackgroundColor}></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Chose a background color for the line counter</PopoverHeader>
                            <PopoverBody>
                            <HexColorPicker color={lineCounterBackgroundColor} onChange={setLineCounterBackgroundColor} />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover> 

                    <FormLabel mb='0' mx="2">
                        line counter background Color
                    </FormLabel>
                </div>

                <div className='d-flex my-2 flex-row align-items-center justify-content-start'>
                    <FormLabel mb='0'>
                        Show Line Counter
                    </FormLabel>
                    <Switch id='show_Line_Counter' isChecked={lineCounterShow} onChange={(e:ChangeEvent<HTMLInputElement>)=>{showLineCounter(e)}}/>
                </div>





                {/* {editorSettings} */}
            </DrawerBody>

            <DrawerFooter>
                    <Button margin={"0 5px"} colorScheme='blue' variant='outline'>
                        Discard Changes
                    </Button>

                    <Button margin={"0 5px"} colorScheme='blue' variant='solid' onClick={()=>{update_editor_settings()}}>
                        Save Changes
                    </Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>





                {/* This section corresponds to the reading buttons */}
                {
                    !props.isInteractive &&
                    <div className="d-flex flex-grow-0 flex-row justify-content-between align-items-center px-2 mx-1 rounded">
                    {/* this is the volume button */}
                    <Tooltip hasArrow label='Volume' placement="top" color='white'>   
                        <div className="d-flex flex-grow-0 wia-button-large">
                            <label  className="h-auto m-0  py-0 ps-2 d-flex justify-content-start align-items-center" >
                                <img className="w-0 p-0" src={volumneIcon} alt="Save" style={{height: '20px', width: "auto" }}></img>
                            </label>
                            <div className="px-2">
                                <Popover>
                                    <PopoverTrigger>
                                        <button className="py-0 m-0">{volume}%</button>
                                    </PopoverTrigger>
                                    <Portal>
                                        <PopoverContent>
                                        {/* <PopoverArrow />
                                        <PopoverHeader>Header</PopoverHeader>
                                    <PopoverCloseButton /> */}

                                        <PopoverBody>
                                            <Slider aria-label='slider-ex-5' defaultValue={30} onChangeEnd={(val:number) => setVolume(String(val))}>
                                                <SliderTrack bg='blue'>
                                                    <SliderFilledTrack bg='writeItAloud.800' />
                                                </SliderTrack>
                                                <SliderThumb boxSize={6}>
                                                    <Box color='tomato'  />
                                                </SliderThumb>
                                            </Slider>
                                        </PopoverBody>

                                        <PopoverFooter>
                                            Drag the slide to adjust the volume    
                                        </PopoverFooter>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>                              
                            </div>
                        </div>                 
                    </Tooltip>



                    {/* this is the reading speed button */}
                    <Tooltip hasArrow label='Reading Speed' placement="top" color='white'>
                        <div className="d-flex flex-grow-0 wia-button-large wia-button-large">
                            <label  className="h-auto m-0 py-0 ps-3 d-flex justify-content-start align-items-center" >
                                <img className="w-0 p-0" src={speedIcon} alt="Save" style={{height: '20px', width: "auto" }}></img>
                            </label>
                            <div className="px-2">
                                <Select variant='unstyled' bg='gray.100' id={"reading_speed_selector"}
                                value={readingSpeed} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleReadingSpeedChange(e.target.value)}>
                                    <option  value={ReadingSpeeds.BY_SENTENCE} selected>       {ReadingSpeeds.BY_SENTENCE.toLowerCase()}       </option>
                                    <option  value={ReadingSpeeds.EVERY_2_WORDS}>              {ReadingSpeeds.EVERY_2_WORDS.toLowerCase()}     </option>
                                    <option  value={ReadingSpeeds.EVERY_3_WORDS}>              {ReadingSpeeds.EVERY_3_WORDS.toLowerCase()}     </option>
                                    <option  value={ReadingSpeeds.EVERY_4_WORDS}>              {ReadingSpeeds.EVERY_4_WORDS.toLowerCase()}     </option>
                                    <option  value={ReadingSpeeds.EVERY_WORD}>                 {ReadingSpeeds.EVERY_WORD.toLowerCase()}        </option>
                                    <option  value={ReadingSpeeds.MANUALLY}>                   {ReadingSpeeds.MANUALLY.toLowerCase()}          </option>
                                </Select>
                            </div>
                        </div>                 
                    </Tooltip>
                </div>
                
                }
        
        </Flex>
    )
}