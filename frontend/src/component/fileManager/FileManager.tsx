/*
File Explorer Controller

This is the left menu in the interface, in charge of the hamburger menu, the file explorer controls, 
and the rendering of files in the directory
*/
import { useEffect, useState }  from 'react';
import menuIcon from '../../icons/menu_white.png';
import DirectoryFolder from './DirectoryFolder';
import DirectoryFile from './DirectoryFile';
import FileManagerMenu from './FileManagerMenu';
import CreateFolder from './CreateFolder';
import CreateFile from './CreateFile';
import Toasts from '../generic/Toasts';

import { useFileDirToOpen, useIsSafeToOpen, useTryToOpen } from '../fileManager/FileContext';
import IconButton from '../generic/IconButton';
import { Box, Flex } from '@chakra-ui/react';
import NotFound from '../generic/NotFound';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const eel = window.eel;

/*
    This component controls the directory navigation menu on the left
*/
type Props = {
    isMinimized: boolean;
    setIsMinimized: (status: boolean)=>void;
};
export default function FileManager({ isMinimized, setIsMinimized}: Props){
    interface FolderContent{
        folder: string[];
        txt: string[];
    }

    //The new path is temporarily saved until it is confirmed there are no conflicts closing previous file
    const [temporaryDirectory, setTemporaryDirectory] = useState<string>("");
    // const [directory, setDirectory] = useState<string>("C:\\");
    const [directory, setDirectory] = useState<string>("C:\\Users\\fmms\\OneDrive\\Escritorio");
    const [folderContent, setFolderContent] = useState<FolderContent | null>(null);
    const [createFolder, setCreateFolder] = useState<boolean>(false);
    const [createFile, setCreateFile] = useState<boolean>(false);
    const { ErrorToast, InfoToast } = Toasts();

    /*These variables are from the context manager. They indicate the opened directory and the if it is possible to open it*/
    const {fileDirToOpen, setFileDirToOpen } = useFileDirToOpen();
    const {isSafeToOpen, setIsSafeToOpen}    = useIsSafeToOpen();
    const {setTryToOpen}    = useTryToOpen();

    //triggered only once as soon as the component in mounted 
    useEffect(() => {
        openDirectory(directory);
    }, [])
    
    //triggered when the context-provided variable isSafeToOpen is passed
    useEffect(() => {
        if(isSafeToOpen){
            setFileDirToOpen(temporaryDirectory);
            //These variables are set to false every time, because they are used as a test to open a different file than the current one
            setTryToOpen(false);
            setIsSafeToOpen(false);
        }
    }, [isSafeToOpen])
    

    /*
        Loads the content of the parent directory

        If the current directory is already root (C:/), then nothing will happen
    */
    function openPreviousDirectory(){
        //If we reached root, stop
        if (directory.localeCompare("C:\\") == 0 || directory.localeCompare("C:/") == 0 || directory.localeCompare("/Users") == 0)
            return;

        let previousDirectory = directory.substring(0, directory.lastIndexOf("\\"));

        //If the root directory is bad formatted
        if(previousDirectory.localeCompare("C:") == 0)
            previousDirectory += "\\";

        openDirectory(previousDirectory);
    }

    /*
        Loads the content of an given directory and set the Directory variable to that given directory

        @param dir
            Is a string indicating the directory to open
    */
    function openDirectory(dir: string){
        console.log("How many times it is open:???")
        setDirectory(dir);
        eel.read_folder(dir)(( contentList: FolderContent ) => {
            if (!contentList){
                //If the user is using a Mac, the root directory is reset
                try{
                    dir = "/Users"
                    setDirectory(dir);
                    eel.read_folder(dir) ((contentList: FolderContent) => {
                        setFolderContent(contentList);
                    })
                }

                catch{
                    ErrorToast({
                        title: 'Error accessing a folder.',
                        message: dir + "might require special permissions",
                    })
                }
            }else
                setFolderContent(contentList);
        } )    
    }


    /*
        Opens and allows the edition of a file

        @param dir
            Is a string indicating the directory to open
    */
    function openFile(dir: string){
        setTryToOpen(true);
        setTemporaryDirectory(dir);
        InfoToast({
            title: 'File Opened',
            message: 'With the name: ' + dir
        });
    }


    /*
        Triggers the process to create a new file

        @param dir
            Is a string indicating the directory to open
    */
    function createNewFile(){
        setCreateFile(!createFile);
    }

    /*
        Triggers the creation of a new folder

        By controlling the useState variable createFolder,
        allows the rendering of an input to create a new file
        and the un-rendering of such option when the input is out of focus
    */
    function createNewFolder(){
        setCreateFolder(!createFolder);
    }

    /*
        Refresh the list of items in the directory
    */
    function refresh(){
        openDirectory(directory);
    }

    if(!folderContent){
        return(
            <div>
                loading
            </div>
        )
    }

    function ChangeMenuSize()
    {
        setIsMinimized(!isMinimized);
    }

    return(
        <Box
            display="flex"
            height="100vh"
            p={0}
            m={0}
            flexDirection="column"
            alignItems="center"
            justifyContent="start"
            shadow="lg"
            bg="aloudBlue.2"
            width={isMinimized ? "4rem" : "20vw"}
            transition="width 0.5s ease-in-out"
        >
            <Flex
                h="auto"
                w="100%"
                alignItems="center"
                justifyContent="stretch"
            >
                {/* title and hamburger menu */}
                <IconButton callback={ChangeMenuSize} image={menuIcon} altName={'hamburger_menu'} tooltipName={"compress menu"} />
                {!isMinimized && <button onClick={() => {ChangeMenuSize()}} style={{color:"white"}} className='flex-grow-1 fw-medium text-nowrap'>Speech explorer</button>}
            </Flex>
            {
                !isMinimized &&
                <>

                    {/* this section display the file's control sections, including tags and buttons */}
                    {<FileManagerMenu path={directory} previousDir={openPreviousDirectory} refresh={refresh} createNewFile={createNewFile} createNewFolder={createNewFolder}/>}


                    {/*This section display the items inside the directory  */}
                    <Box w="100%" h="100%" display="flex" flexDirection="column" className='bg-iccc-blue simple-scroll'>
                        <div className='w-100 d-flex flex-column align-items-center'  >
                            {
                                (Object.keys(folderContent["folder"]).length == 0 && Object.keys(folderContent["txt"]).length == 0)
                                &&
                                
                                <Flex 
                                    flex={1}
                                    w="calc( 100% - 30px)"
                                    h="calc( 100% - 30px)"
                                    m="15px"
                                >
                                <NotFound message="No text files in this folder. You can create new files in the speech explorer menu above this message."/>
                                </Flex>
                                // <div className='h-100 w-auto m-2 shadow  bg-white rounded p-3'>
                                //     No text files in this folder. You can create new files in the speech explorer menu above this message.
                                // </div>
                            }
                            {
                                Object.keys(folderContent).length > 0 &&
                                folderContent["folder"].map( (item:string) => {
                                    {/* These buttons open the next folder */}
                                    return <DirectoryFolder key={item} fileName = {item[0]} path = {item[1]} openFolder={openDirectory} refresh={refresh}/>
                                })
                            }
                            {
                                Object.keys(folderContent).length > 0 &&
                                folderContent["txt"].map( (item:string) => {
                                    {/* These components are the txt files in the directory */}
                                    return(
                                        <DirectoryFile key={item} fileName = {item[0]} path = {item[1]} openFile={openFile} refresh={refresh} isOpen={item[1] === fileDirToOpen}/>

                                    )
                                })
                            }
                        </div>
                        {createFolder && <CreateFolder cancelCreation = {createNewFolder} directory = {directory} refresh={refresh}/>}
                        {createFile && <CreateFile cancelCreation = {createNewFile} directory = {directory} refresh={refresh}/>}
                    </Box>
                </>
            }
        </Box>
    )
}
