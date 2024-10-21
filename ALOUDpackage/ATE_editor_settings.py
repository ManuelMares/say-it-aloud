import re
import json
import ALOUDpackage.settings as GLOBAL
import ALOUDpackage.File as FILE


#=====================================================================================================================================
#PUBLIC FUNCTIONS
#=====================================================================================================================================
def update(ATE_settings):
    """
        Updates the settings file.
    @param
        settings - a settings object
    @return
        A boolean value indicating the settings were updated
    """
    #The stored file has to be a valid string
    ATE_settings_dict = json.dumps(ATE_settings, indent=4)
    ATE_settings_dict = str(ATE_settings_dict)

    FILE.save_file_content(GLOBAL.ATE_SETTINGS_PATH, settings_dict)
    
    return true