
"""=====================================================================================================================================
SETTING.PY

This file is in charge of declaring and initializing the global variables for the whole package
=====================================================================================================================================
"""

#=====================================================================================================================================
#imports
#=====================================================================================================================================
from pathlib import Path




#=====================================================================================================================================
#GLOBAL VARIABLES - These variables are initialized in the function init
#=====================================================================================================================================
ACRONYM_DICT_PATH = ""
REACTION_DICT_PATH = ""
ACRONYM_DICTIONARY_NAME = ""



#=====================================================================================================================================
#functions
#=====================================================================================================================================

def init():
    """
        This function is in charge of initializing the global variables
        @precondition
            The eel server started
        @postcondition
            The global variables were initialized according to the OS
    """

    #indicating global variables
    global ACRONYM_DICTIONARY_NAME
    global ACRONYM_DICT_PATH
    global REACTION_DICT_PATH
    global ATE_SETTINGS_PATH

    #initializing global variables
    ACRONYM_DICTIONARY_NAME = "AcronymDictionary.json"
    ACRONYM_DICT_PATH       = Path(".\src\ALOUDpackage\AcronymDictionary.tsx")    
    REACTION_DICT_PATH      = Path(".\src\ALOUDpackage\ReactionsDictionary.tsx")    
    ATE_SETTINGS_PATH       = Path(".\src\ALOUDpackage\ATE_editor_settings.tsx")    
    ATE_SETTINGS_PATH       = Path(".\src\ALOUDpackage\ATE_editor_settings.tsx")    
        
    