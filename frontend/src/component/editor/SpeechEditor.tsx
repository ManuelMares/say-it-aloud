import React, { useState, useEffect, useReducer, useRef }  from 'react';
import Toasts from '../generic/Toasts'
import Functions from '../generic/Functions';
import {Flex} from '@chakra-ui/react'
import {useFileDirToOpen, useIsSafeToOpen, useTryToOpen } from '../fileManager/FileContext';
import NotFound from '../generic/NotFound';
// import AcronymDictionary from '../../ALOUDpackage/AcronymDictionary';
// import ReactionsDictionary from '../../ALOUDpackage/ReactionsDictionary';
// import MoodDictionary from '../../ALOUDpackage/MoodDictionary';
import AIDE from './AIDE';
import FileControlSection from './FileControlSection';
import * as monaco from 'monaco-editor'
// import { IMoodDictionary,
//        ITagList,
//        IWordList,
//        IAcronymDictionary,
//        IReactionsDictionary,
//        predictionActions, } from './ALOUDEditor_interfaces';
// import { IAIDE_editor_settings, markType } from './AIDE/AIDE_interfaces';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const eel = window.eel;




// enum ReadingSpeeds{
//   BY_SENTENCE     = "BY_SENTENCE",
//   EVERY_2_WORDS   = "EVERY_2_WORDS",
//   EVERY_3_WORDS   = "EVERY_3_WORDS",
//   EVERY_4_WORDS   = "EVERY_4_WORDS",
//   EVERY_WORD      = "EVERY_WORD",
//   MANUALLY        = "MANUALLY",
// }

// Dictionary variables for implementation
// type Dictionary = IMoodDictionary|IReactionsDictionary|IAcronymDictionary
type Props = {
  isMinimized: boolean;
};
export default function SpeechEditor({isMinimized}:Props) {
  //==============================================================================================================================================================
  //==================================================================VARIABLE DECLARATION========================================================================
  //==============================================================================================================================================================

  //ALOUD PACKAGE VARIABLES 
  //They are used to import all the dictionaries
  //They are combined and send as parameters for the AIDE
  // const [AIDEEditorSettings, setATEEditorSettings]       = useState<IAIDE_editor_settings|null>(null);
  // const [Acronyms_JSON]                                 = useState<IAcronymDictionary>(AcronymDictionary);
  // const [Reaction_JSON]                                 = useState<IReactionsDictionary>(ReactionsDictionary);
  // const [Moods_JSON]                                    = useState<IMoodDictionary>(MoodDictionary);
  // const [wordsList, setWordList]                        = useState<ITagList>({})


  const [initialValue, setInitialValue]                               = useState('');                             /*Only for when a new file is opened*/
  const [value, setValue]                               = useState('');                             /*Stores the file content string. This variable is sent to AIDE component and to update the content*/
  // const toast                                           = useToast();
  const [hasFileChanges, setHasFileChanges]             = useState<boolean>(false);                 //bool value to check if file content has changed
  // const [isOpen, setIsOpen]                             = useState(false);                          // State to control the alert dialog
  // const [fileWasUpdated, setFileWasUpdated]             = useState<boolean>(false);

  //CONTEXT PROVIDER VARIABLES
  //they are used to manipulate the files
  const {isSafeToOpen, setIsSafeToOpen}                 = useIsSafeToOpen();
  console.log(isSafeToOpen);
  const {tryToOpen, setTryToOpen}                       = useTryToOpen();  
  const { ErrorToast }                       = Toasts();
  const { ExtractFileName }                             = Functions();
  const [isInteractive, setIsInteractive]               = useState<boolean>(false);
  // const [previousKey, setPreviousKey]                   = useState<string>("");                     //to store previous keypressed value
  const [fileOpened, setFileOpened]                     = useState<string>("");
  const {fileDirToOpen }              = useFileDirToOpen();

  //USED TO FORCE AN UPDATE OF THE AIDE COMPONENT
  const [, forceUpdate]                                                   = useReducer(x => x + 1, 0);    
  //==============================================================================================================================================================
  //======================================================================== LOGIC ===============================================================================
  //==============================================================================================================================================================


  useEffect(()=>{
    setTryToOpen(false)
    setIsSafeToOpen(true)
  }, [tryToOpen])
  

   /*
    Triggered by an update in fileDirToOpen, and it loads the indicated file in the variable
    @preconditions
      context variable fileDirToOpen is updated
    @postconditions
      The interface is updated with the content of the new file
  */
  useEffect(()=>{
    //Add this point, it is guaranteed that all changes are saved  
    if (fileDirToOpen !== null && fileDirToOpen !== "") {
      //Updating variable
      const fileName = ExtractFileName(fileDirToOpen);
      setFileOpened(fileName);
      
      //Temporary content of the file
      setValue("Reading the file....");

      //Reading the file
      eel.read_file_content(fileDirToOpen)((content:string) => {
        if (content !== null){
          setInitialValue(content);
          // fileContent = content;
          setIsSafeToOpen(false);
        }
        else
          ErrorToast({
            title: "Error",
            message: "An error has ocurred while reading the file content",
          })
      });

    }
  }, [fileDirToOpen])








  //------------------------------passing arguments to the AIDE TAG menu---------------------------------
  useEffect(()=>{
    createWordList();
  }, [])
  function createWordList(){
  }







  //function for the control settings
  useEffect(() => {
    setHasFileChanges(true);
  }, [value])
  
  function handleSaveClick(){
    setHasFileChanges(false);
    eel.save_file_content(fileDirToOpen, value);
  }
  function ALOUDExample(){}
  function cleanPage(){}
  function handleSelectedSpeed(){}
  function updateSettings(){
    import("../../ALOUDpackage/ATE_editor_settings")
    .then(() => {
    // .then((res:any) => {
      // setATEEditorSettings(res.default) 
      forceUpdate();
    })
  }
  





  //=================================================================================
  //Store the editor variables set in AIDE.tsx
  //=================================================================================
  //This is the editor itself
  //To know more, see https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneCodeEditor.html
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  function setEditor(e:monaco.editor.IStandaloneCodeEditor){ 
    editor.current = e; 
  }

  //This is the editor model.
  //to know more, see https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.ITextModel.html
  const editorModel = useRef<monaco.editor.IModel|null>(null);
  function setEditorModel(e:monaco.editor.IModel|null){ editorModel.current = e; }

  //=================================================================================
  //Context Menu Functions: These are sent as parameters
  //=================================================================================
  function readWholeText(){
    const textPage = editorModel!.current!.getValue();
    console.log("whole text: ",  textPage)
  }
  function readLine(){
    const textLine = editorModel!.current!.getValue();
    console.log("text line: ", textLine);
  }
  function readSelection(){
    const textSelection = editorModel!.current!.getValueInRange( editor!.current!.getSelection()!);
    console.log("textSelection: ", textSelection);
  }
  
  function playAudio(){
    // eel.compiler_compile(content)( (answer:boolean) => {
    //   if(!answer){        
    //       ErrorToast({
    //         title: "Error compiling text",
    //         message: "The indicated voice is not correct, or a voice was not provided.",
    //       })
    //   }
    // });
    
    console.log("line content: " + editorModel!.current!.getLineContent( editor!.current!.getPosition()!.lineNumber))
  }

  //=================================================================================
  // Temporary list of things you can retrieve from the editor as text
  //=================================================================================
  //if error in these, use editorModel.current instead of editor
  // console.log("Whole page of text: " + editorModel!.getValue())
  // console.log("word at position, end column: " + editorModel!.getWordAtPosition( editor!.getPosition() as monaco.IPosition)!.endColumn)
  // console.log("word at position, start column: " + editorModel!.getWordAtPosition( editor!.getPosition() as monaco.IPosition)!.startColumn)
  // console.log("get current word form beginning to end, even if in the middle: " + editorModel!.getWordAtPosition( editor!.getPosition() as monaco.IPosition)!.word)
  // console.log("word until position, end word : " + editorModel!.getWordUntilPosition( editor!.getPosition() as monaco.IPosition)!.endColumn)
  // console.log("word until position, start word : " + editorModel!.getWordUntilPosition( editor!.getPosition() as monaco.IPosition)!.startColumn)
  // console.log("get the word from beginning until current position: " + editorModel!.getWordUntilPosition( editor!.getPosition() as monaco.IPosition)!.word)
  // console.log("position: " + editor!.getPosition())
  // console.log("line content: " + editorModel!.getLineContent( editor!.getPosition()!.lineNumber))
  // console.log("get selection range : " + editor!.getSelection())
  // console.log("get selection: " + editorModel!.getValueInRange( editor!.getSelection()! ))
  // if(editor!.getSelection()!.startColumn === editor!.getSelection()!.endColumn
  //   && editor!.getSelection()!.startLineNumber === editor!.getSelection()!.endLineNumber
  //   )
  // {
  //   console.log("Nothing highlighted!")
  // }
  // else{
  //   console.log("There are things highlighted")
  // }


  const NO_FILE_INSTRUCTIONS = "To being writing aloud, open/create a file with help of the speech explorer on the right.\nThen, start typing!\nIf you need more space to write, you can compress the speech explorer with the top-left button"

  return (
    <Flex 
      direction="column"
      width={isMinimized ? "calc(100vw - (25vw + 4rem + 30px))" :  "calc(100vw - (25vw + 20vw + 30px))"}
      h="calc( 100% - 30px)"
      m="15px"
      transition="width 0.5s ease-in-out"
    >
      {
        !fileDirToOpen ? 
          <NotFound message={NO_FILE_INSTRUCTIONS}/>
        :
          <>
            <FileControlSection isMinimized={isMinimized} updateSettings={updateSettings} onSelectedSpeedChange={handleSelectedSpeed} cleanPage={cleanPage} example={ALOUDExample} play={playAudio} fileName={fileOpened} saveFile={handleSaveClick} hasFileChanges={hasFileChanges} isInteractive={isInteractive} setIsInteractive={setIsInteractive}/>
            <Flex
              flex="1"
              bg="white"
              flexDir="row"
              borderRadius='lg'
              shadow="md"
              overflowY="auto"
            >
              <AIDE 
                  initialValue={initialValue} 
                  setEditor={setEditor}
                  setEditorModel = {setEditorModel}
                  readWholeText = {readWholeText}
                  readLine = {readLine}
                  readSelection = {readSelection}
                  setValue = {setValue}
              />
            </Flex>
            {/* <AIDE {...AIDEEditorSettings} id="ALOUD_editor" buttons_buttonList={[]} buttons_dropdownList={[]} wordList={wordsList} setCellText={getLastCellText} setAIDEText={getAIDEText} content={value}/> */}
          </>
      }
    </Flex>
  );
}