import { useEffect } from "react";
import * as monaco from "monaco-editor";
// import { Editor } from "@monaco-editor/react";
import { Flex } from "@chakra-ui/react";

interface IProps{
  setEditor: (editor:monaco.editor.IStandaloneCodeEditor)=>void,
  setEditorModel: (editor:monaco.editor.IModel|null)=>void
  initialValue: string,
  readWholeText: ()=>void,
  readLine: ()=>void,
  readSelection: ()=>void,
  setValue: (content:string) =>void,
}
let MonacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;
export default function AIDE(props: IProps){
  
  useEffect(() => {
    initiallizeEditor();
  }, [])
  useEffect(() => {
    if (MonacoEditor) {
      MonacoEditor.setValue(props.initialValue);
    }
  }, [props.initialValue])




  function initiallizeEditor() {
    if (MonacoEditor) {
      return;
    }
    //========================================================================
    //Aloud Language Definition
    //========================================================================
    
    // (self as Window).MonacoEnvironment = {
    //   getWorkerUrl: function () {
    //     return './editor.worker.js';
    //   },
    // };
    
    monaco.languages.register({ id: "Aloud" });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider("Aloud", {
      tokenizer: {
        root: [
          [/\\laugh/, "reaction"],
          [/\\normal{.*?}/, "tone"],
          [/\\mad{.*?}/, "tone"],
          // [/\\normal/, "tone"],
          [/\\lol|\\intro|\\hhy/, "acronym"],
        ],
      },
    });

    //========================================================================
    //Aloud Theme definition
    //========================================================================
    monaco.editor.defineTheme("AloudTheme", {
      base: "vs",
      inherit: false,
      rules: [
        { token: "reaction",    foreground: "00B1B0" },
        { token: "tone",        foreground: "FEC84D" },
        { token: "acronym",     foreground: "E42256", fontStyle: "italic"  },
      ],
      colors: {
        "editor.foreground": "#000000",   //text
      },
    });

    //========================================================================
    //Aloud Suggestions Definitions
    //========================================================================
    monaco.languages.registerCompletionItemProvider("Aloud", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        if (model.getValueInRange(range)[0] === '\\') {
          range.startColumn += 1; // Exclude the slash
        }
        const suggestions = [
          //Acronyms
          {
            label: "\\lol",
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: "Laughing Out Loud!",
            range: range,
          },
          {
            label: "\\intro",
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: "This is an introduction",
            range: range,
          },
          {
            label: "\\hhy",
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: "Hello, How are you?",
            range: range,
          },
        ];
        return { suggestions: suggestions };
      },
    });

    //========================================================================
    //Aloud Editor Declaration
    //========================================================================
    MonacoEditor = monaco.editor.create(document.getElementById("container")!, {
        theme: "AloudTheme",
        value: props.initialValue,
        // value: "this is a test that everything workds",
        language: "Aloud",  
        wordWrap: "on",
        minimap: {enabled: false},      
        folding: false,                 //reduce space between text and code
        lineNumbersMinChars: 3,         //reduce space of numbers
        fontSize: 16,
        scrollBeyondLastLine: false,
    });
    props.setEditor(MonacoEditor)
    props.setEditorModel(MonacoEditor!.getModel())

    //=================================================================================
    //Adds context menu options
    //=================================================================================
    //read whole text
    
    MonacoEditor!.onDidChangeModelContent(() => {
      const content:string = MonacoEditor!.getValue();
      props.setValue(content);
    });
    MonacoEditor!.addAction({
      id: 'read_page',
      label: 'Read Page',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI], // Optional: Keyboard shortcut to trigger this action
      contextMenuGroupId: 'read',
      contextMenuOrder: 1, // The order within the group
      run: props.readWholeText as ()=>void
    });
    //read line
    MonacoEditor!.addAction({
      id: 'read_line',
      label: 'Read Line',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK], // Optional: Keyboard shortcut to trigger this action
      contextMenuGroupId: 'read',
      contextMenuOrder: 2, // The order within the group
      run: props.readLine as ()=>void
    });
    //read selection
    MonacoEditor!.addAction({
      id: 'read_selection',
      label: 'Read Selection',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB], // Optional: Keyboard shortcut to trigger this action
      contextMenuGroupId: 'read',
      contextMenuOrder: 3, // The order within the group
      run: props.readSelection as ()=>void
    });
  }//End of initiallizeEditor function
  


  

  return(
    <Flex 
      id="container" 
      h="calc(100% - 10px)" 
      w="calc(100% - 10px)" 
      m="0" 
      p="5px"
    >
    </Flex>
  ) 
};

