import json
import ALOUDpackage.settings as GLOBAL


#=====================================================================================================================================
#PUBLIC FUNCTIONS
#=====================================================================================================================================
def exists(target: str):
    """
        Indicates the existence of an acronym in the dictionary given an acronym word (not key)
        @param target
            A string to search for
        @return
            A boolean value indicating if the item exists
    """
    reaction_dict = _open_reaction_dictionary()
    return True if reaction_dict[target] else False


def search(target: str):
    """
    Returns an acronym object
    @param target
        A acronym word to look for
    @return
        An acronym object
    """
    reaction_dict = _open_reaction_dictionary()
    return reaction_dict[target]


#=====================================================================================================================================
#PRIVATE FUNCTIONS
#=====================================================================================================================================
def _open_reaction_dictionary() -> dict: 
    """
        returns the acronym dictionary from memory
        @param acronym_path
            the path where the acronym file is located
        @return
            A dictionary structure
    """
    with open(GLOBAL.REACTION_DICT_PATH) as reaction_dict:
        return json.load(reaction_dict)
    

