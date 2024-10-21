import { useState } from 'react';
import './App.css';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { writeItAloudTheme } from './Styles/Theme';
import SpeechEditor from './component/editor/SpeechEditor';
import FileManager from './component/fileManager/FileManager';
import { FileContextProvider } from './component/fileManager/FileContext';
import RightMenu from './component/rightMenu/RightMenu';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const eel = window.eel;
eel.set_host( 'ws://localhost:5169' )


/* 
  This file renders the pages of this SPA page. Tha is, the new routes are declared here. 
  This page also creates the connection with the python file

  In general, this file renders the three main sections of the interface: speeches explorer, editor and right menu.

  To learn how to communicate Python with React, check the Readme file
*/
function App() {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  return (
    <ChakraProvider theme={writeItAloudTheme}>
      <FileContextProvider>
        <Flex height="100vh" bg="aloudWhite.2" w="100vw">
          <FileManager isMinimized={isMinimized} setIsMinimized={setIsMinimized} />
          <SpeechEditor isMinimized={isMinimized} />
          <RightMenu/>
        </Flex>
      </FileContextProvider>
    </ChakraProvider>
  );
}

export default App
