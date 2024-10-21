import { ChangeEvent, useState}  from 'react';
// import Shortcuts from './Shortcuts';
// import 'reactjs-popup/dist/index.css';

import { Select } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react"
// import Acronym from './Acronym/AcronymPage';
import AcronymPage from './acronym/AcronymPage';
import DivisionLine from '../generic/DivisionLine';
import ReactionPage from './reactions/ReactionPage';

export default function RightMenu(){
    const MENU_OPTIONS = {
        "Acronym"   : "Acronym",
        "Shortcut"  : "Shortcut",
        "Setting"   : "Setting",
        "AboutUs"   : "About Us",
        "Reactions" : "Reactions"
    }


    // const [isFocused, setIsFocused] = useState<boolean>(true);
    const [isSelected, setIsSelected] = useState<string>(MENU_OPTIONS.Shortcut);


    return(
        <Box
            minW="25vw"
            w="25vw"
            h="100%"
        >

        {/* <div className='p-3 ps-1 d-flex flex-column gap-1' style={{width: "25%", maxWidth:"25%", minWidth: "25%", height:"100%"}}> */}
            {/*
            The focus on this panel is triggered by the style focusedStyle:focus-within
            This solution was selected since the regular focus and the React's onFocus and onBlur don't bubble,
            and since the focusin and focusout did not work here either.

            This style is defined in index.css
            */}
            <Box w="100%" h="100%" className='rounded focusedStyle'>
                <Box h="100%" w="100%" p="3">
                    {
                        <div className='h-100'>
                            <div className = "w-100 h-10">
                                <Flex>
                                    {/* drop down menu part */}
                                    <Box w='100%'>
                                        <Select id="drop-down-menu" onChange={(event:ChangeEvent<HTMLSelectElement>) => { setIsSelected(event.target.value) }}>

                                            <option value={MENU_OPTIONS.Acronym}>            {MENU_OPTIONS.Acronym}</option>
                                            <option value={MENU_OPTIONS.Shortcut}selected>   {MENU_OPTIONS.Shortcut}</option>
                                            <option value={MENU_OPTIONS.Setting}>            {MENU_OPTIONS.Setting}</option>
                                            <option value={MENU_OPTIONS.AboutUs}>            {MENU_OPTIONS.AboutUs}</option>
                                            <option value={MENU_OPTIONS.Reactions}>            {MENU_OPTIONS.Reactions}</option>
                                        </Select>
                                    </Box>

                                </Flex>
                                
                                <DivisionLine/>    
                            </div>

                            <div className = "w-100 h-90">
                                {/* trangs container: so far prints out the title name when option is selected */}
                                {isSelected == MENU_OPTIONS.Acronym  && <AcronymPage/>}
                                {isSelected == MENU_OPTIONS.Shortcut && <p>{MENU_OPTIONS.Shortcut}</p>}
                                {isSelected == MENU_OPTIONS.Setting  && <p>{MENU_OPTIONS.Setting}</p>}
                                {isSelected == MENU_OPTIONS.AboutUs  && <p>{MENU_OPTIONS.AboutUs}</p>}
                                {isSelected == MENU_OPTIONS.Reactions  && <ReactionPage/>}
                            </div>
                        </div>


                    }
                </Box>
            </Box>
        </Box>
    )
}
