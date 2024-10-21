
enum markType{
    TAG                         = "TAG",
    UNDERLINE                   = "UNDERLINE",
    BOLD                        = "BOLD"
}
interface buttonCallback_return{
    lineText                    : string,
    buttonId                    : string,
    lineCounter                 : number,
    lineHTMLElement             : HTMLElement,
    buttonHTMLElement           : HTMLElement,
    event                       : Event,
}
interface DropdownCallback_return{
    lineText                    : string,
    selectedOption              : string,
    lineCounter                 : number,
    dropdownId                  : string,
    lineHTMLElement             : HTMLElement,
    buttonHTMLElement           : HTMLElement,
    event                       : Event,
}
interface IButton{
    //* Displayed word */
    buttonName                  : string,
    //* HTMLElement Id */
    buttonId?                   : string,
    //* Returns {lineText:string, buttonId:string} */
    buttonCallback              : (lineText:string, buttonId:string)=>void,
    //* text color */
    button_fontColor            : string,
    //* background color */
    button_backgroundColor      : string
}
interface IDropdown{
    //* HTMLElement Id */
    dropdownId?                 : string,
    //* Default text */
    dropdownPlaceHolder         : string,
    //* Dropdown options */
    dropdownDropDownOptions     : string[],
    //* Returns {lineText:string, selectedOption:string, dropdownId:string,} */
    dropdownCallback            : (lineText:string, buttonId:string)=>void,
    //* text color */
    dropdown_fontColor          : string,
    //* background color */
    dropdown_backgroundColor    : string
}
interface ITagList{
    [listName: string]: IWordList
}

enum predictionActions{
    TOTAG                       = "TOTAG",
    TOREPLACE                   = "TOREPLACE",
    TOCOMPLETE                  = "TOCOMPLETE"
}
interface IWordList{
    list                    : {key:string, description: string}[],
    markColor               : string,
    markStyle               : markType,
    predictionAction        : predictionActions,
}
interface IAIDE
{
    //global
    /** "12px", "8rem", etc;   Applied to every text in the editor;   Default value: '12px' */
    fontSize?                           : string, 
    /** Width of the while editor;   Default value: '100%' */
    width?                              : string, 
    /** Height of the while editor;   Default value: '100%' */
    height?                             : string,
    /** Will be used for the id of all objects, in case you need to override any function or add events */
    id                                  : string,

    //editor properties
    /** Only the text area. Default value: black */
    editor_fontColor?                   : string,
    /** Only the text area. Default value: white */
    editor_backgroundColor?             : string,
    /** Only the text area. Default value: black */
    editor_active_fontColor?            : string,
    /** Only the text area. Default value: grey */
    editor_active_backgroundColor?      : string,
    /** Words to be tagged, predicted and optional for replacement */
    wordList                            : ITagList
    
    //line labels properties
    /** Only for the line counter*/
    counter_fontColor?                  : string,
    /** Only for the line counter */
    counter_backgroundColor?            : string,
    /** Hides the line counter */
    counter_showCounter?                : boolean
    
    //buttons properties
    /** list of buttons */
    buttons_buttonList                  : IButton[],
    /** list of dropdowns */
    buttons_dropdownList                : IDropdown[],
    
    //menu
    /** for the options menu for each tag */
    menu_backgroundColor?               : string,
    /** for the options menu for each tag */
    menu_fontColor?                     : string,
    /** for the options menu for each tag */
    menu_title_fontColor?               : string,

    /** To return the last cell text */
    setCellText         : (text: string)=>void, 
    /** To return the text from the whole editor */
    setAIDEText         : (text: string)=>void,
}
interface IATE_TagMenu{
    optionSelected      : (option:string)=>void,
    title               : string, 
    position            : number[]
    wordToPredict       : string,
    options             : {key:string, description: string}[],
    predict             : boolean,
    backgroundColor?    : string,
    fontColor?          : string,
    titleFontColor?     : string,
    numOptionsDisplayed : number,
}

interface IHTMLElementPosition extends HTMLElement {
    positionx: number, 
    positiony: number
}
interface IAIDE_editor_settings{
    fontSize                        : string,
    width                           : string;
    height                          : string;
    editor_fontColor                : string;
    editor_backgroundColor          : string;
    editor_active_fontColor         : string;
    editor_active_backgroundColor   : string;
    counter_fontColor               : string;
    counter_backgroundColor         : string;
    counter_showCounter             : boolean;
    menu_backgroundColor            : string;
    menu_fontColor                  : string;
    menu_title_fontColor            : string;

}
export type {
    // not exporting IWords | Inumbers
    IAIDE,
    IWordList,
    IDropdown,
    IButton,
    DropdownCallback_return,
    buttonCallback_return,
    markType,
    ITagList,
    IATE_TagMenu,
    IHTMLElementPosition,
    predictionActions,
    IAIDE_editor_settings
}