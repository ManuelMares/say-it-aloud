/*
Controls the file explorer menu

Controls the options menu in the speech explorer, which includes the create new file, new folder, and to navigate to previous folder.
It also displays the current location
*/

import refreshIcon from "../../icons/refresh_white.png";
import newFolderIcon from "../../icons/new_folder.png";
import newFileIcon from "../../icons/new_file.png";
import upIcon from "../../icons/up_white.png";
import IconButton from '../generic/IconButton';
import { Box, Flex } from '@chakra-ui/react';


interface Props{
    path: string;
    previousDir: ()=>void;
    refresh: ()=>void;
    createNewFile: ()=>void;
    createNewFolder: ()=>void;
}
export default function FileManagerMenu(props: Props){
    return(
        <Flex
            w="100%"
            h="auto"
            alignItems="center"
        >
            <IconButton tooltipName='Previous Folder' altName='up_icon' callback={props.previousDir} image={upIcon}/>

            <Box 
                flex="1" 
                overflow="auto" 
                textColor="white" 
                flexWrap="nowrap"
                whiteSpace="nowrap"
                fontWeight="bold"
                alignItems="center"
                h="100%"
                className="simple-scroll"
                alignContent="center"
            >
                {props.path}
            </Box>
            
            {/* refresh */}
            <IconButton callback={props.refresh} image={refreshIcon} altName={'folder_icon'} tooltipName={"Update list of files"} />


            {/* new folder */}
            <IconButton callback={props.createNewFolder} image={newFolderIcon} altName={'folder_icon'} tooltipName={"Create New Folder"} />

            {/* new file */}
            <IconButton callback={props.createNewFile} image={newFileIcon} altName={'file_icon'} tooltipName={"Create new file"} />
        </Flex>
    )
}