export default () => {return ATE_editor_settings}

interface IATE_editor_settings{
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

const ATE_editor_settings:IATE_editor_settings = {    
    //global
    /** "12px", "8rem", etc;   Applied to every text in the editor;   Default value: '12px' */
    fontSize                           : "12px", 
    /** Width of the while editor;   Default value: '100%' */
    width                              : "100%", 
    /** Height of the while editor;   Default value: '100%' */
    height                             : "100%",

    //editor properties
    /** Only the text area. Default value: black */
    editor_fontColor                   : "#000000", // black
    /** Only the text area. Default value: white */
    editor_backgroundColor             : "#ffffff", //white
    /** Only the text area. Default value: black */
    editor_active_fontColor            : "#000000",  //black
    /** Only the text area. Default value: grey */
    editor_active_backgroundColor      : "#f7f7f7",
    
    //line labels properties
    /** Only for the line counter*/
    counter_fontColor                  : "#000000",
    /** Only for the line counter */
    counter_backgroundColor            : "#f7f7f7",
    /** Hides the line counter */
    counter_showCounter                : true,    
    
    //menu
    /** for the options menu for each tag */
    menu_backgroundColor                : "#ffffff",
    /** for the options menu for each tag */
    menu_fontColor                      : "#000000",
    /** for the options menu for each tag */
    menu_title_fontColor                : "blue",    
}

